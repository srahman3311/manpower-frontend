export const getDateText = (date: Date) => {

    let day = date.getDate();
    const month = date.toLocaleString("en-us", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`

}