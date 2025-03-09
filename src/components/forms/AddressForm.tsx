import { _Address } from "../../types/Address";
import styles from "./AddressForm.module.css";
import TextInput from "../inputs/TextInput";

interface AddressFormProps {
    address: _Address
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AddressForm: React.FC<AddressFormProps> = ({ address, handleChange }) => {

    return (
        <div className={styles.address_form}>
            <TextInput
                label="Line 1"
                name="line1"
                data-type="address"
                value={address.line1}
                onChange={handleChange}
            />
            <TextInput
                label="Line 2"
                name="line2"
                data-type="address"
                value={address.line2}
                onChange={handleChange}
            />
            <TextInput
                label="Postal Code"
                name="postalCode"
                data-type="address"
                value={address.postalCode}
                onChange={handleChange}
            />
            <TextInput
                label="City"
                name="city"
                data-type="address"
                value={address.city}
                onChange={handleChange}
            />
            <TextInput
                label="State"
                name="state"
                data-type="address"
                value={address.state}
                onChange={handleChange}
            />
            <TextInput
                label="Country"
                name="country"
                data-type="address"
                value={address.country}
                onChange={handleChange}
            />
        </div>
    );
    
}

export default AddressForm;

