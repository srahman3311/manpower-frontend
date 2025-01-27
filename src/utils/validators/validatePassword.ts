export const validatePassword = (password: string, password2: string) => {

    const regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\?])(?=.{8})");

    if(password !== password2) {
        return { 
            isPassValid: false, 
            passValMessage: "Passwords didn't match" 
        };
    }

    if(!regEx.test(password)) {
        return {
            isPassValid: false, 
            passValMessage: `Password must have an uppercase and a lowercase letter, 
            a symbol(!@#$%^&*?) and it must be 8 characters long`
        }
    } 

    return { isPassValid: true, passValMessage: null };
    
}