import { removeFiles as removeMedia } from "../../services/files";
import { handleApiError } from "../error-handlers/handleApiError";

type RemoveReturn = {
    success: boolean
    message: string
}

export const removeFiles = async(urls: string[]): Promise<RemoveReturn> => {

    try {
   
        const message = await removeMedia(urls);
        return {
            success: true,
            message
        }
   
    } catch(error) {
        const { message } = handleApiError(error);
        return {
            success: false,
            message
        }
    }
    
}