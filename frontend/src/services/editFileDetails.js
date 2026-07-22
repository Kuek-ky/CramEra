import {Alert} from "react-native";

export const editDocumentDetails = async (
    API_BASE, fileId, file, ownerUserId,
    moduleId, title, description,
    documentType, visibility
) => {
  try {
    let data = new FormData();
    if (file != null) {
      const fileUri = file.uri;
      const fileName = file.name || `document_${fileId}`;
      const fileType = file.mimeType;
      const fileobj = {
            uri: fileUri,
            type: fileType,
            name: fileName,
        };
      data.append('file', fileobj);
    }

    data.append('document', JSON.stringify({
      "ownerUserID": ownerUserId,
      "module": {"id":moduleId},
      "title": title,
      "description": description,
      "documentType": documentType,
      "visibility": visibility
    }));

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `${API_BASE}/file/update/${fileId}`);
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        console.error(`Backend error (${xhr.status}):`, xhr.responseText);
        Alert.alert("Upload Failed", `Server Error: ${xhr.responseText}`);
      }
    };
    xhr.send(data);

  } catch (error) {
    console.error("Error updating document details:", error.message);
    return null;
  }
};