export const handleApiError = (error: any): { message: string } => {

    // Get the response object from error. 
    const errorResponse = error.response;

    // !errorResponse means server is down. Return the message "Server Error".
    if(!errorResponse) return { message: "Something went wrong" };

    // 404 response might not get sent from api endpoint, because if an enpoint 
    // doesn't exist then it will have a 404 response too.
    const isEndpointNotExistError = errorResponse.status === 404 && errorResponse.data.includes("<!DOCTYPE html>");
    if(isEndpointNotExistError) return { message: errorResponse.statusText };

    // Otherwise return the actual error message sent by the server.
    return { message: error.response.data.message ?? "Something went wrong" };

}