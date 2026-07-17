import * as UploadTask from 'expo-file-system';

export const editDocumentDetails = async (
    fileId, file, ownerUserId,
    moduleId, title, description,
    documentType
) => {
  console.log("on edit");

  try {
    let data = new FormData();
    if (file != null) {
      const fileUri = file.uri;
      const fileName = file.name || `document_${fileId}`;
      const fileType =file.type;
      var fileobj = {
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
      "documentType": documentType
    }));

    console.log("payload ->", data);

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://172.18.110.10:8080/file/update/${fileId}`);
    xhr.send(data);

    if (!xhr) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


  } catch (error) {
    console.error("Error updating document details:", error.message);
    return null;
  }
};