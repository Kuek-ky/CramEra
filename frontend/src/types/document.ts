export interface Document {

    id: number;

    title: string;

    description: string;

    module: string;

    author: string;

    ownerUserID: number;

    rating: number;

    fileUrl: string;

    documentType: string;

    saved: boolean;
}