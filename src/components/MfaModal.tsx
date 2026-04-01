"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";

interface ActivePin {
    key: string;
    label: string;
}

interface MfaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (collectedPins: Record<string, string>) => void;
    activePins: ActivePin[];
    isProcessing: boolean;
}

export const MfaModal = ({ isOpen, onClose, onComplete, activePins, isProcessing }: MfaModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentInput, setCurrentInput] = useState("");
    const [collectedPins, setCollectedPins] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const currentPinDef = activePins[currentIndex];
    const isLastStep = currentIndex === activePins.length - 1;

    const handleNext = () => {
        if (!currentInput.trim()) return;

        const newCollected = { ...collectedPins, [currentPinDef.key]: currentInput };
        setCollectedPins(newCollected);
        setCurrentInput(""); // Clear input for the next step

        if (isLastStep) {
            onComplete(newCollected);
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl mx-4">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 text-[#1814F3] rounded-full flex items-center justify-center">
                        <ShieldCheck size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-[#343C6A] mb-2">
                    Security Verification
                </h2>
                <p className="text-center text-[#718EBF] text-sm mb-8">
                    Step {currentIndex + 1} of {activePins.length}: Please enter your {currentPinDef.label} PIN to authorize this transaction.
                </p>

                <div className="space-y-6">
                    <Input
                        type="password"
                        placeholder="Enter PIN"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        className="h-14 text-center text-2xl tracking-[0.5em] rounded-2xl bg-[#F7F9FC] border-transparent focus-visible:ring-[#1814F3]"
                        maxLength={6}
                        autoFocus
                    />

                    <div className="flex gap-4">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="flex-1 h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 text-[#343C6A] text-lg font-medium"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!currentInput.trim() || isProcessing}
                            className="flex-1 h-14 rounded-2xl bg-[#1814F3] hover:bg-blue-700 text-white text-lg font-medium shadow-lg shadow-blue-500/20"
                        >
                            {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : (isLastStep ? "Verify & Send" : "Next Step")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};