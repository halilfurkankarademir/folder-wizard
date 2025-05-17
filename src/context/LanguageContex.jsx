import { createContext, useEffect, useState, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [activeLanguage, setActiveLanguage] = useState(() => {
        return localStorage.getItem("activeLanguage") || "tr";
    });

    const saveActiveLanguage = (lang) => {
        localStorage.setItem("activeLanguage", lang);
    };

    // Save active language when clicked language button in navbar
    useEffect(() => {
        if (activeLanguage) {
            saveActiveLanguage(activeLanguage);
        }
    }, [activeLanguage]);

    return (
        <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
