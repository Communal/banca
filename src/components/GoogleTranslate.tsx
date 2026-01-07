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
                    autoDisplay: false, // Don't show the banner
                },
                "google_translate_element"
            );
        };

        // 2. Check for existing language cookie
        // Cookie format is usually: googtrans=/source/target (e.g., /en/it)
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
        if (match) {
            setLang(match[1]);
        } else {
            // --- FORCE ITALIAN DEFAULT FOR NEW USERS ---
            // Uncomment the lines below to make Italian the default for everyone

            document.cookie = "googtrans=/en/it; path=/";
            setLang("it");
            window.location.reload();

        }
    }, []);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLang(newLang);

        // 3. Set the special Google Cookie to trigger translation
        // Format: /sourceLang/targetLang
        document.cookie = `googtrans=/en/${newLang}; path=/`;

        // 4. Reload page to apply the translation
        window.location.reload();
    };

    return (
        <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2 border border-transparent hover:border-brand-accent transition-all group">
            {/* Icon */}
            <Globe className="w-4 h-4 text-gray-500 group-hover:text-brand-accent" />

            {/* Beautiful Custom Dropdown */}
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

            {/* Hidden Google Widget (Must exist for logic to work) */}
            <div id="google_translate_element" className="hidden" />

            {/* Google Script */}
            <Script
                src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                strategy="afterInteractive"
            />
        </div>
    );
}