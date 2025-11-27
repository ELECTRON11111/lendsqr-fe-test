import { useEffect, useState } from "react";

export const useIsScreenSmall = () => {
    const [isMobile, setIsMobile] = useState(false); 
    
    useEffect(() => {
        const handler = () => {
            const screenWidth = window.screen.width;
            const isMobile = screenWidth < 650;
            setIsMobile(isMobile);
        }
        
        window.addEventListener("resize", handler);

        return () => window.removeEventListener("resize", handler);
    }, []);
    
    return isMobile;
}