import styles from "./InputFields.module.css"

interface TextInputProps extends React.ComponentProps<"input"> {
    label?: string
    error?: boolean
    errorMsg?: string
    value?: string
    withMarginBottom?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = ({ 
    label,
    withMarginBottom = true,
    type = "text",
    required,
    error,
    errorMsg,
    onChange,
    value,
    ...rest 
}) => {

    const classes = `${!withMarginBottom ? "no_bottom_margin" : ""}`;

    return (
        <div className={`${styles.text_input} ${styles[classes]}`}>
            {
                label 
                ? 
                <label className={styles.label}>
                    {label} {required ? <span>*</span> : null}
                </label> 
                : 
                null
            }
            <input 
                type={type}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {
                error && !value 
                ?
                <p className={styles.error_msg}>
                    {errorMsg}
                </p>
                :
                null
            }
        </div>
    );

}

export default TextInput;