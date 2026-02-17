import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PeekViewProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const PeekView: React.FC<PeekViewProps> = ({ isOpen, onClose, title, children }) => {
    const [render, setRender] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            setRender(true);
            document.body.style.overflow = 'hidden';
            // focus the close button shortly after opening for keyboard users
            setTimeout(() => closeBtnRef.current?.focus(), 50);
        } else {
            const timer = setTimeout(() => setRender(false), 300); // Wait for animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!render) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none" role="dialog" aria-modal="true" aria-labelledby="peek-title">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`relative w-full sm:w-[500px] lg:w-[600px] h-full bg-[var(--bg-main)] shadow-2xl border-l border-[var(--border-main)] flex flex-col pointer-events-auto transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-main)] bg-[var(--bg-main)] z-10 sticky top-0">
                    <h2 id="peek-title" className="text-2xl font-black text-[var(--text-main)] tracking-tight line-clamp-1 pr-4">{title}</h2>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                        aria-label="Close"
                        type="button"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 animate-fadeIn">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PeekView;
