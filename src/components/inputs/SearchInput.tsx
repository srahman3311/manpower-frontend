import styles from "./InputFields.module.css"

interface SearchInputProps extends React.ComponentProps<"input"> {
    customClassName?: string
    withMarginBottom?: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({ 
    customClassName = "",
    withMarginBottom = true,
    ...rest 
}) => {

    return (
        <div className={`${styles.search_input}`}>
            <input 
                type="text"
                {...rest}
            />
        </div>
    );

}

export default SearchInput;