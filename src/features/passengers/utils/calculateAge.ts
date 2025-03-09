export const calculateAge = (date: Date): number => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age;
}