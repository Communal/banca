"use client";

import { use, useRef, useState } from "react";
import { useTransactionDetails } from "@/hooks/useTransactions";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { formatCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export default function TransactionDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();

    const receiptRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const { data: tx, isLoading, error } = useTransactionDetails(id);
    const { data: authData } = useCurrentUser();
    const user = authData?.user || authData;
    const currencyCode = user?.currency || "USD";

    if (isLoading) {
        return <div className="animate-pulse bg-white rounded-3xl h-[60vh] max-w-2xl mx-auto" />;
    }

    if (error || !tx) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl max-w-2xl mx-auto">
                <p className="text-[#FE5C73] font-bold">Transaction not found.</p>
                <Button onClick={() => router.back()} variant="outline" className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

    const amt = Number(tx.amount);
    const isIncome = amt > 0;

    const handleDownload = async () => {
        if (!receiptRef.current) return;

        setIsDownloading(true);

        try {
            // 1. Capture the exact node to PNG
            const imgData = await toPng(receiptRef.current, {
                quality: 1,
                pixelRatio: 2, 
                backgroundColor: "#ffffff",
            });

            // 2. Initialize PDF (A4 size)
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            
            // 3. THE FIX: Strict boundary math for A4 sizing
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const padding = 20; // 20mm padding around edges

            const maxContentWidth = pdfWidth - (padding * 2);
            const maxContentHeight = pdfHeight - (padding * 2);
            
            // Start by assuming we scale to fit the width
            let contentWidth = maxContentWidth;
            let contentHeight = (imgProps.height * contentWidth) / imgProps.width;

            // If stretching it to the width makes it too tall for the page, scale by height instead!
            if (contentHeight > maxContentHeight) {
                contentHeight = maxContentHeight;
                contentWidth = (imgProps.width * contentHeight) / imgProps.height;
            }

            // Center the image horizontally on the page
            const xOffset = (pdfWidth - contentWidth) / 2;

            // 4. Add image and save
            pdf.addImage(imgData, "PNG", xOffset, padding, contentWidth, contentHeight);
            pdf.save(`${tx.transactionIdDisplay}_Receipt.pdf`);

            toast.success("Receipt downloaded successfully!");
        } catch (err) {
            console.error("PDF Generation Error:", err);
            toast.error("Failed to generate PDF receipt.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#718EBF] hover:text-[#343C6A] hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-[#343C6A]">Transaction Details</h1>
            </div>

            {/* Main Card Container */}
            <div className="bg-white rounded-[2rem] p-6 md:p-12 shadow-sm relative">
                
                {/* --- PRINTABLE CAPTURE ZONE --- */}
                {/* Wrapped in a stylized "receipt" container for the final PDF look */}
                <div 
                    ref={receiptRef} 
                    className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 max-w-lg mx-auto"
                >
                    {/* Top Status Area */}
                    <div className="flex flex-col items-center justify-center pb-8 mb-8 border-b-2 border-dashed border-gray-200">
                        <div className="mb-8 flex justify-center">
                            <img
                                src="/images/web.png"
                                alt="Montedeiazzu Logo"
                                style={{ width: "160px", height: "auto", objectFit: "contain" }}
                            />
                        </div>
                        
                        <div className="w-14 h-14 bg-[#E7EDFF] text-[#1814F3] rounded-full flex items-center justify-center mb-4">
                            <FileText size={28} />
                        </div>
                        <h2 className="text-[#343C6A] font-bold text-lg md:text-xl text-center mb-2 px-4">
                            {tx.description}
                        </h2>
                        <p className={`text-3xl font-black ${isIncome ? "text-[#41D4A8]" : "text-[#232323]"}`}>
                            {isIncome ? "+" : "-"}{formatCurrency(Math.abs(amt), currencyCode)}
                        </p>
                        <div className="flex items-center gap-1 mt-4 text-[#41D4A8] bg-green-50 px-3 py-1 rounded-full text-sm font-medium capitalize">
                            <CheckCircle2 size={16} />
                            {tx.status}
                        </div>
                    </div>

                    {/* Details Grid (Fixed Layout) */}
                    <div className="space-y-4 text-sm md:text-base">
                        {[
                            ["Transaction ID", tx.transactionIdDisplay],
                            ["Date & Time", new Date(tx.date).toLocaleString()],
                            ["Category/Type", <span className="capitalize" key="type">{tx.type}</span>],
                            tx.cardLastFour && [
                                "Funding Source",
                                `${tx.bankName || "Card"} •••• ${tx.cardLastFour}`,
                            ],
                        ]
                            .filter(Boolean)
                            .map(([label, value]: any, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4"
                                >
                                    <span className="text-[#718EBF] shrink-0">
                                        {label}
                                    </span>
                                    <span className="font-medium text-[#232323] sm:text-right break-words">
                                        {value}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
                {/* --- END PRINTABLE ZONE --- */}

                {/* Action Footer */}
                <div className="mt-8 pt-6 flex justify-center">
                    <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full max-w-sm h-14 rounded-2xl bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-lg shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Download Receipt
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}