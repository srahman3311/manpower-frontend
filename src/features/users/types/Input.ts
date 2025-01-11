export type InputType = {
    name: string;
    type: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: boolean;
    fullwidth?: boolean;
    disabled?: boolean;

}


export interface IButtonProps {
    type: "submit" | "reset" | "button" | undefined;
    fullWidth?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    danger?: boolean;
    secondary?: boolean;
    children?: React.ReactNode;
}
