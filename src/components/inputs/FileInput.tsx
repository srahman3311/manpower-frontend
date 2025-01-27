import { useRef } from "react";
import Avatar from "../../assets/avatar.png"
import styles from "./FileInput.module.css";

interface FileInputFieldProps extends React.ComponentProps<"input"> {
    file?: File | null
    imageUrl?: string
    text?: string
    forPerson?: boolean
    handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// When user uploads an image file, show it's name. And when user wants to update his/her 
// profile image show the image file name saved in the database 
const FileInput: React.FC<FileInputFieldProps> = (props) => {

    const { 
        file, 
        imageUrl = "", 
        text, 
        forPerson = true, 
        handleFile
    } = props;

    const inputFile = useRef<HTMLInputElement>(null); 

    const handleFileInputClick = () => {
        if(inputFile.current) inputFile.current.click()
    }

    const previewImage = file ? URL.createObjectURL(file) : null;

    // For user photo we don't need to style the upload button because it comes
    // with user avatar. But for other photos we need to style it.
    let buttonClassName = "";
    if(!forPerson) buttonClassName = "upload_button"

    return (
        <div className={styles.file_input} onClick={handleFileInputClick}>
            <input 
                type="file" 
                ref={inputFile}
                multiple
                onChange={handleFile}
            />
            <div className={styles.file_input_content}>
                {
                    forPerson
                    ?
                    <div className={styles.avatar_container}>
                        <img 
                            src={previewImage ? previewImage : (imageUrl ? imageUrl : Avatar)}
                            alt="Avatar"
                        />
                    </div>
                    :
                    null
                }
                {
                    (!forPerson && (previewImage || imageUrl))
                    ?
                    <div className={styles.image_preview}>
                        <img 
                            src={previewImage ?? imageUrl}
                            alt="Something"
                        />
                    </div>
                    :
                    null
                }
                <span className={styles[buttonClassName]}>
                    {text ?? "Upload Your Photo"}
                </span>
            </div>
        </div>
    );
    
}


export default FileInput;