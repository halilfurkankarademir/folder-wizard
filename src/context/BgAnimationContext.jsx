import { useContext, createContext, useEffect, useState } from "react";

const BgAnimationContext = createContext();

export const BgAnimationProvider = ({ children }) => {
    const [isBgAnimationActive, setIsBgAnimationActive] = useState(false);

    useEffect(() => {
        const storedBgAnimation = localStorage.getItem("animatedBackground");
        setIsBgAnimationActive(storedBgAnimation === "true");
    }, [isBgAnimationActive]);

    return (
        <BgAnimationContext.Provider
            value={{ isBgAnimationActive, setIsBgAnimationActive }}
        >
            {children}
        </BgAnimationContext.Provider>
    );
};

export const useBgAnimation = () => useContext(BgAnimationContext);
