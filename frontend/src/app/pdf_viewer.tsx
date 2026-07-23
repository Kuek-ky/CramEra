/**
 * pdf_viewer.tsx — Expo Go compatible PDF viewer (no native modules).
 *
 * Only dependency (already bundled in Expo Go):
 *   npx expo install react-native-webview
 *
 * Architecture:
 *   1. Fetch a presigned URL from the backend (auth'd, timeout, typed errors).
 *   2. Download the PDF with React Native's native fetch — this bypasses
 *      browser CORS entirely and gives us real HTTP status codes, so an
 *      expired presigned URL (403) is detected precisely and the URL is
 *      refreshed exactly once.
 *   3. Convert to base64 and render with pdf.js (Mozilla, via cdnjs) inside
 *      a WebView. Works identically on iOS and Android.
 *
 * Known limits (inherent to the Expo Go / WebView approach):
 *   - Files are held in memory as base64 (~33% size inflation). Enforce a
 *     size cap; default 15 MB. Larger files need a dev build + native module.
 *   - pdf.js is loaded from cdnjs at view time, so the device needs internet
 *     anyway — acceptable since the PDF itself is remote.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

// ---------------------------------------------------------------------------
// Config — adjust to your backend
// ---------------------------------------------------------------------------

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
const PRESIGN_TIMEOUT_MS = 10_000;
const DOWNLOAD_TIMEOUT_MS = 30_000;
const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB cap for base64-in-memory

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ViewerErrorKind =
  | 'auth'       // missing token / 401 from backend
  | 'not_found'  // 404
  | 'network'    // offline, DNS, timeout
  | 'server'     // 5xx or malformed backend response
  | 'expired'    // presigned URL rejected even after one refresh
  | 'too_large'  // exceeds MAX_FILE_BYTES
  | 'render'     // pdf.js could not parse the file
  | 'unknown';

interface ViewerError {
  kind: ViewerErrorKind;
  message: string;
  retryable: boolean;
}

type ViewerState =
  | { status: 'loading'; step: 'presign' | 'download' | 'render' }
  | { status: 'ready'; base64: string }
  | { status: 'error'; error: ViewerError };

interface PdfViewerProps {
  /** Identifier your backend uses to locate the file (key, id, path…) */
  fileId: string;
  onLoaded?: (pageCount: number) => void;
}

class ViewerException extends Error {
  constructor(public readonly viewerError: ViewerError) {
    super(viewerError.message);
  }
}

// ---------------------------------------------------------------------------
// Step 1: presigned URL from backend
// ---------------------------------------------------------------------------

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
  outerSignal: AbortSignal,
): Promise<Response> {
  const controller = new AbortController();
  const onOuterAbort = () => controller.abort();
  outerSignal.addEventListener('abort', onOuterAbort, { once: true });
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
    outerSignal.removeEventListener('abort', onOuterAbort);
  }
}

async function fetchPresignedUrl(
  fileId: string,
  signal: AbortSignal,
): Promise<string> {

  let res: Response;
  try {
    res = await fetchWithTimeout(
      `${API_BASE}/document/view/${fileId}`,
        {},
      PRESIGN_TIMEOUT_MS,
      signal,
    );
  } catch {
    throw new ViewerException({
      kind: 'network',
      message: 'Could not reach the server. Check your connection.',
      retryable: true,
    });
  }

  if (res.status === 401 || res.status === 403) {
    throw new ViewerException({
      kind: 'auth',
      message: 'Your session has expired. Please sign in again.',
      retryable: false,
    });
  }
  if (res.status === 404) {
    throw new ViewerException({
      kind: 'not_found',
      message: 'This document no longer exists.',
      retryable: false,
    });
  }
  if (!res.ok) {
    throw new ViewerException({
      kind: 'server',
      message: `Server error (${res.status}). Try again shortly.`,
      retryable: true,
    });
  }

  let url: string | undefined;
  try {
    url = await res.text();
  } catch {
    /* fall through to validation below */
  }
  if (!url || !/^https:\/\//.test(url)) {
    throw new ViewerException({
      kind: 'server',
      message: 'The server returned an invalid file link.',
      retryable: true,
    });
  }
  return url;
}

// ---------------------------------------------------------------------------
// Step 2: download PDF as base64 (native fetch → no CORS, real status codes)
// ---------------------------------------------------------------------------

async function downloadPdfBase64(
  presignedUrl: string,
  signal: AbortSignal,
): Promise<string> {
  let res: Response;
  try {
    res = await fetchWithTimeout(presignedUrl, {}, DOWNLOAD_TIMEOUT_MS, signal);
  } catch {
    throw new ViewerException({
      kind: 'network',
      message: 'Download failed. Check your connection.',
      retryable: true,
    });
  }

  if (res.status === 403) {
    // Presigned URL expired between issuance and download.
    // Caller treats this as a signal to refresh the URL once.
    throw new ViewerException({
      kind: 'expired',
      message: 'The document link expired.',
      retryable: true,
    });
  }
  if (res.status === 404) {
    throw new ViewerException({
      kind: 'not_found',
      message: 'The file was not found in storage.',
      retryable: false,
    });
  }
  if (!res.ok) {
    throw new ViewerException({
      kind: 'server',
      message: `Storage error (${res.status}). Try again shortly.`,
      retryable: true,
    });
  }

  const declaredSize = Number(res.headers.get('content-length') ?? 0);
  if (declaredSize > MAX_FILE_BYTES) {
    throw new ViewerException({
      kind: 'too_large',
      message: 'This document is too large to preview in the app.',
      retryable: false,
    });
  }

  const blob = await res.blob();
  if (blob.size > MAX_FILE_BYTES) {
    throw new ViewerException({
      kind: 'too_large',
      message: 'This document is too large to preview in the app.',
      retryable: false,
    });
  }

  // RN supports FileReader; readAsDataURL yields "data:...;base64,XXXX"
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('read failed'));
    reader.readAsDataURL(blob);
  }).catch(() => {
    throw new ViewerException({
      kind: 'unknown',
      message: 'Could not process the downloaded file.',
      retryable: true,
    });
  });

  const base64 = dataUrl.split(',')[1];
  if (!base64) {
    throw new ViewerException({
      kind: 'unknown',
      message: 'Could not process the downloaded file.',
      retryable: true,
    });
  }
  return base64;
}

// ---------------------------------------------------------------------------
// Step 3: pdf.js host page rendered inside the WebView
// ---------------------------------------------------------------------------

const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174';

function buildHtml(base64: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=4.0, user-scalable=yes"/>
<style>
  html, body { margin:0; padding:0; background:#e8e8e8; }
  #pages { display:flex; flex-direction:column; align-items:center; padding:8px 0; }
  canvas { display:block; margin:4px 0; box-shadow:0 1px 4px rgba(0,0,0,.25); background:#fff; max-width:100%; }
</style>
</head>
<body>
<div id="pages"></div>
<script src="${PDFJS}/pdf.min.js"></script>
<script>
  const post = (msg) => window.ReactNativeWebView.postMessage(JSON.stringify(msg));
  (async () => {
    try {
      if (!window.pdfjsLib) throw new Error('pdfjs failed to load from CDN');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '${PDFJS}/pdf.worker.min.js';

      const raw = atob('${base64}');
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

      const doc = await pdfjsLib.getDocument({ data: bytes }).promise;
      const container = document.getElementById('pages');
      const targetWidth = document.documentElement.clientWidth - 16;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      for (let n = 1; n <= doc.numPages; n++) {
        const page = await doc.getPage(n);
        const base = page.getViewport({ scale: 1 });
        const scale = targetWidth / base.width;
        const viewport = page.getViewport({ scale: scale * dpr });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = (viewport.width / dpr) + 'px';
        canvas.style.height = (viewport.height / dpr) + 'px';
        container.appendChild(canvas);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      }
      post({ type: 'loaded', pages: doc.numPages });
    } catch (e) {
      post({ type: 'error', message: String(e && e.message || e) });
    }
  })();
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PdfViewer({ fileId, onLoaded }: PdfViewerProps) {
  const [state, setState] = useState<ViewerState>({
    status: 'loading',
    step: 'presign',
  });
  const [rendering, setRendering] = useState(true);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const { signal } = controller;

    setRendering(true);
    setState({ status: 'loading', step: 'presign' });
    try {
      let url = await fetchPresignedUrl(fileId, signal);
      if (signal.aborted) return;

      setState({ status: 'loading', step: 'download' });
      let base64: string;
      try {
        base64 = await downloadPdfBase64(url, signal);
      } catch (e) {
        // Expired between presign and download → refresh the URL ONCE.
        if (
          e instanceof ViewerException &&
          e.viewerError.kind === 'expired' &&
          !signal.aborted
        ) {
          url = await fetchPresignedUrl(fileId, signal);
          if (signal.aborted) return;
          base64 = await downloadPdfBase64(url, signal);
        } else {
          throw e;
        }
      }
      if (signal.aborted) return;

      setState({ status: 'loading', step: 'render' });
      setState({ status: 'ready', base64 });
    } catch (e) {
      if (signal.aborted) return; // unmount, not a real error
      const error: ViewerError =
        e instanceof ViewerException
          ? e.viewerError
          : { kind: 'unknown', message: 'Something went wrong.', retryable: true };
      setState({ status: 'error', error });
    }
  }, [fileId]);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      let msg: { type?: string; pages?: number; message?: string } = {};
      try {
        msg = JSON.parse(event.nativeEvent.data);
      } catch {
        return; // ignore anything that isn't ours
      }
      if (msg.type === 'loaded') {
        setRendering(false);
        onLoaded?.(msg.pages ?? 0);
      } else if (msg.type === 'error') {
        setState({
          status: 'error',
          error: {
            kind: 'render',
            message: 'This file could not be displayed as a PDF.',
            retryable: false,
          },
        });
      }
    },
    [onLoaded],
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  if (state.status === 'loading') {
    const caption =
      state.step === 'presign'
        ? 'Preparing document…'
        : state.step === 'download'
          ? 'Downloading…'
          : 'Rendering…';
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.caption}>{caption}</Text>
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Can't open document</Text>
        <Text style={styles.errorBody}>{state.error.message}</Text>
        {state.error.retryable && (
          <Pressable style={styles.retryButton} onPress={load}>
            <Text style={styles.retryLabel}>Try again</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: buildHtml(state.base64) }}
        onMessage={handleMessage}
        javaScriptEnabled
        // The host page only talks to cdnjs for pdf.js; the PDF bytes are
        // already embedded, so no other network access is needed.
        style={styles.webview}
      />
      {rendering && (
        <View style={styles.renderOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1, backgroundColor: '#e8e8e8' },
  renderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  caption: { color: '#666', fontSize: 14 },
  errorTitle: { fontSize: 17, fontWeight: '600' },
  errorBody: { color: '#666', fontSize: 14, textAlign: 'center' },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  retryLabel: { color: '#fff', fontSize: 15, fontWeight: '500' },
});
