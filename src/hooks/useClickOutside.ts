import { useState, useEffect, useRef } from "react";

export const useClickOutside = (options: { exceptions?: string[] }) => {

    const { exceptions = [] } = options;

    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleClickOutside = (event: any) => {

        if(elementRef.current && !elementRef.current.contains(event.target)) setIsVisible(false);

        if(exceptions.length <= 0) return;

        let eventTarget = event.target;
        const eventTargetParentIds: string[] = [];

        while(eventTarget) {
            eventTargetParentIds.push(eventTarget.id);
            eventTarget = eventTarget.parentElement;
        }

        for(let x = 0; x < exceptions.length; x++) {
            const matchedException = eventTargetParentIds.find(item => item === exceptions[0]);
            if(matchedException) setIsVisible(true);
        }

    };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isVisible]);

    return { elementRef, isVisible, setIsVisible };

}
