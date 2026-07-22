import { Document } from "../types/document";

const API = "http://172.18.77.219:8080";

export async function getPublicDocuments() {

    const response = await fetch(`${API}/document/public`);

    return await response.json() as Document[];

}

export async function searchDocuments(keyword: string) {

    const response = await fetch(
        `${API}/document/search?keyword=${keyword}`
    );

    return await response.json() as Document[];

}

export async function getPersonalDocuments() {

    const response = await fetch(
        `${API}/document/personal`
    );

    return await response.json() as Document[];

}