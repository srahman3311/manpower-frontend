import { uploadFiles as uploadMedia } from "../../services/files";
import { handleApiError } from "../error-handlers/handleApiError";

export interface UploadFileReturn {
    urls: { url: string }[]
    errorMessage?: string
}

export const uploadFiles = async(files: File[], directory: string): Promise<UploadFileReturn> => {

    const formData = new FormData();
    files.forEach(file => formData.append("files", file))

    try {

        const urls = await uploadMedia(formData, directory);
        return { urls }

    } catch(error) {
        const { message } = handleApiError(error);
        return {
            urls: [],
            errorMessage: message
        }
    }
    
}