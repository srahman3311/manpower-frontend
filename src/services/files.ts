import fileHttpClient from "./fileHttpClient";

export const uploadFiles = async(formData: FormData, directory: string): Promise<{ url: string }[]> => {
    return fileHttpClient.post(`/uploads?directory=${directory}`, formData);
}

export const removeFiles = async(urls: string[]): Promise<string> => {
    return fileHttpClient.post(`/uploads/remove`, { urls });
}

