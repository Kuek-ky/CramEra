import { Document } from "../types/document";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export async function getPublicDocuments() {

    const response = await fetch(`${API}/document/public`);

    return await response.json() as Document[];

}

export async function searchDocuments(keyword: string) {

    const response = await fetch(
        `${API_BASE}/document/search?keyword=${keyword}`
    );

    return await response.json() as Document[];

}

export async function getPersonalDocuments() {

    const response = await fetch(
        `${API_BASE}/document/personal`
    );

    return await response.json() as Document[];

}