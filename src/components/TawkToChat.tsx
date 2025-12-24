"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function TawkToChat() {
    const pathname = usePathname();

    // Logic: Hide chat on Admin pages, Login, and Signup
    if (pathname.startsWith("/admin") || pathname === "/login" || pathname === "/signup") {
        return null;
    }

    return (
        <Script id="tawk-to-widget" strategy="lazyOnload">
            {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/694bf2669914c8197bb940c9/1jd8alof9';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
        </Script>
    );
}