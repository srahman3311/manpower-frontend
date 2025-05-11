import React, { useEffect, useState, useMemo } from "react";
import { Passenger } from "../types/Passenger";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFetchPassengers } from "../hooks/useFetchPassengers";
import styles from "../styles/index.module.css";
import TextInput from "../../../components/inputs/TextInput";
import SearchedItemList from "../../../components/searched-item-list/SearchedItemList";

interface PassengerSearchInputProps {
    selectedPassenger: Passenger | null
    selectPassenger: (passenger: Passenger | null) => void
}

const PassengerSearchInput: React.FC<PassengerSearchInputProps> = ({
    selectedPassenger,
    selectPassenger
}) => {

    const { 
        elementRef, 
        isVisible, 
        setIsVisible 
    } = useClickOutside({ exceptions: [] });
    const {
        loading,
        errorMsg,
        passengerList,
        fetchPassengerList
    } = useFetchPassengers(false)

    const [value, setValue] = useState<string>("");

    useEffect(() => {

        if(value.length < 3) return;

        const delayAPICall = setTimeout(() => {
            fetchPassengerList({
                searchText: value,
                skip: 0,
                limit: 1000
            })
        }, 500)
       
        return () => {
            clearTimeout(delayAPICall);
        } 

    }, [value, fetchPassengerList])

    const handleClick = (item: { id: number, title: string} ) => {
        const passenger = passengerList.find((passenger) => passenger.id === item.id);
        if(!passenger) return;
        selectPassenger(passenger);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value: inputValue } = event.target;
        setValue(inputValue);

        // If user is searching for a passenger after selecting one,
        // then clear the selected passenger
        if(selectedPassenger) {
            selectPassenger(null);
        }

        // If user clears the input or backspaces to less than 3 characters, 
        // then hide the search list
        if(!inputValue || inputValue.length < 3) {
            setIsVisible(false);
            return;
        }

        setIsVisible(true);

    }

    const mappedItemList = useMemo(() => {
        return passengerList.map((item) => {    
            return {
                id: item.id,
                title: `${item.name}${item.passport.number ? ` - ${item.passport.number}` : ""}`
            }
        })
    }, [passengerList])

    // If editing the parent item like expense, revenue, etc
    let inputValue: string | null = null;
    if(selectedPassenger) {
        const { name, passport } = selectedPassenger;
        inputValue = (`${name}${passport?.number ? ` - ${passport?.number}` : ""}`);
    }

    return (
        <div className={styles.passenger_search_input}>
            <TextInput
                label="Passenger"
                type="text" 
                name="passenger"
                placeholder={`Search Passenger`}
                value={inputValue ?? value} 
                autoComplete="off"
                onChange={handleChange} 
            />
            {
                (isVisible && !selectedPassenger)
                ?
                <>
                    <SearchedItemList 
                        elementRef={elementRef}
                        forItem="Passenger"
                        loading={loading}
                        errorMsg={errorMsg}
                        itemList={mappedItemList}
                        handleClick={handleClick}
                    />
                </>
                :
                null    
            }
        </div>
    );

}

export default PassengerSearchInput;