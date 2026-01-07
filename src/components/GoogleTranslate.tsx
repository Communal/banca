"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Globe } from "lucide-react";

export default function GoogleTranslate() {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        // 1. Initialize Google Translate (Hidden)
        // @ts-ignore
        window.googleTranslateElementInit = () => {
            // @ts-ignore
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        // 2. Check for existing language cookie
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);

        if (match) {
            // A. If cookie exists, respect it (even if it is English)
            setLang(match[1]);
        } else {
            // B. No cookie found. Is this a new user?
            const hasForcedLanguage = localStorage.getItem("has_forced_language");

            if (!hasForcedLanguage) {
                // --- FIRST TIME USER: FORCE ITALIAN ---
                document.cookie = "googtrans=/en/it; path=/";
                localStorage.setItem("has_forced_language", "true"); // Mark as done
                setLang("it");
                window.location.reload();
            } else {
                // --- RETURNING USER: DEFAULT TO ENGLISH ---
                // If they have no cookie but HAVE visited before, it means 
                // they likely switched back to English (Original).
                setLang("en");
            }
        }
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLang(newLang);

        // 3. Set the cookie. 
        // Note: For English, we set /en/en. 
        // If Google deletes this cookie automatically, our localStorage check 
        // above ensures we don't accidentally force Italian again.
        document.cookie = `googtrans=/en/${newLang}; path=/`;

        // 4. Reload page
        window.location.reload();
    };

    return (
        <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2 border border-transparent hover:border-brand-accent transition-all group">
            <Globe className="w-4 h-4 text-gray-500 group-hover:text-brand-accent" />

            <select
                value={lang}
                onChange={handleLanguageChange}
                className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none appearance-none cursor-pointer pr-2"
                aria-label="Select Language"
            >
                <option value="en">English</option>
                <option value="it">Italiano</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
            </select>

            <div id="google_translate_element" className="hidden" />

            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="afterInteractive"
            />
        </div>
    );
}