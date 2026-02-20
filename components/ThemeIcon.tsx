import React from 'react';

export const ThemeIcon: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`relative ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-sm"
            >
                <defs>
                    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FE4A49" />
                        <stop offset="100%" stopColor="#EC2726" />
                    </linearGradient>
                    <linearGradient id="secondary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#000000" />
                        <stop offset="100%" stopColor="#444444" />
                    </linearGradient>
                </defs>

                {/* Outer Circular Pattern (Mandala Style) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <rect
                        key={angle}
                        x="48"
                        y="15"
                        width="4"
                        height="15"
                        rx="2"
                        fill="url(#primary-grad)"
                        transform={`rotate(${angle} 50 50)`}
                        className="opacity-80"
                    />
                ))}

                {/* Central Geometric Shapes */}
                <path
                    d="M50 25L75 75H25L50 25Z"
                    stroke="url(#secondary-grad)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M50 75L75 25H25L50 75Z"
                    stroke="url(#primary-grad)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="opacity-90"
                />

                {/* Inner Core */}
                <circle cx="50" cy="50" r="8" fill="url(#secondary-grad)" />
                <circle cx="50" cy="50" r="4" fill="white" className="opacity-40" />
            </svg>
        </div>
    );
};
