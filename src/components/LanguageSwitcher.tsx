"use client";

const LANGUAGES = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
    const changeLanguage = (lang: string) => {
        const select = document.querySelector(
            "#google_translate_element select"
        ) as HTMLSelectElement | null;

        if (!select) return;

        select.value = lang;
        select.dispatchEvent(new Event("change"));

        document.cookie = `googtrans=/en/${lang}; path=/`;
    };

    return (
        <div className="relative flex items-center gap-2">
            {LANGUAGES.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="px-3 py-1.5 text-sm rounded-full border border-border hover:border-brand-accent transition"
                >
                    {lang.flag} {lang.label}
                </button>
            ))}
        </div>
    );
}
