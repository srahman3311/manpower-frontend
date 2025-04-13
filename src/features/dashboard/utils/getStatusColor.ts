export const getStatusColor = (type: string, date: string | null, status?: string | null): string => {

    let color = "green";

    if(type === "passport" && !date) {
        return color;
    }

    if(!date || status === "completed") {
        return color;
    } 

    const todaInMS = new Date().getTime();
    const dateInMS = new Date(date).getTime();
    
    const diff = dateInMS - todaInMS;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if(days < 15) color = "red";
    if(days < 30 && days > 15) color = "yellow"

    return color;

}