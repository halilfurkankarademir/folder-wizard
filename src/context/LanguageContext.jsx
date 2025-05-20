import { createContext, useEffect, useState, useContext } from "react";
import i18n from "../config/i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [activeLanguage, setActiveLanguage] = useState(() => {
        return localStorage.getItem("activeLanguage") || "en";
    });

    const saveActiveLanguage = (lang) => {
        setActiveLanguage(lang);
        localStorage.setItem("activeLanguage", lang);
    };

    // Save active language when clicked language button in navbar
    useEffect(() => {
        if (activeLanguage) {
            saveActiveLanguage(activeLanguage);
            i18n.changeLanguage(activeLanguage);
        }
    }, [activeLanguage]);

    return (
        <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
