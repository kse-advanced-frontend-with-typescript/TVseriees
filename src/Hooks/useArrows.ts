import { useState } from 'react';


export const useArrows = <T>(items: T[], itemsPerInstance: number) =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        if (currentIndex + itemsPerInstance < items.length) {
            setCurrentIndex(currentIndex + itemsPerInstance);
        }
    };

    const handlePrevious = () => {
        if (currentIndex - itemsPerInstance >= 0) {
            setCurrentIndex(currentIndex - itemsPerInstance);
        }
    };

    const visibleItems = items.slice(currentIndex, currentIndex + itemsPerInstance);
    const disableLeft = currentIndex === 0;
    const disableRight = currentIndex + itemsPerInstance >= items.length;

    return {
        visibleItems,
        currentIndex,
        handleNext,
        handlePrevious,
        disableLeft,
        disableRight
    };
};