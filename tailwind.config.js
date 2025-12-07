/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                // Semantic colors using CSS variables
                background: {
                    DEFAULT: 'rgb(var(--bg-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
                    tertiary: 'rgb(var(--bg-tertiary) / <alpha-value>)',
                },
                text: {
                    DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
                    muted: 'rgb(var(--text-muted) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent-primary) / <alpha-value>)', // Orange
                    hover: 'rgb(var(--accent-primary-hover) / <alpha-value>)',
                    secondary: 'rgb(var(--accent-secondary) / <alpha-value>)', // Purple
                },
                status: {
                    success: 'rgb(var(--status-success) / <alpha-value>)', // Green
                    error: 'rgb(var(--status-error) / <alpha-value>)', // Red
                    warning: 'rgb(var(--status-warning) / <alpha-value>)', // Yellow/Orange
                },
                border: 'rgb(var(--border-color) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgb(var(--accent-primary) / 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgb(var(--accent-primary) / 0.6)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                }
            },
            boxShadow: {
                'warm': '0 4px 20px -4px rgba(249, 115, 22, 0.1)',
                'warm-lg': '0 8px 30px -4px rgba(249, 115, 22, 0.2)',
            },
        },
    },
    plugins: [],
}
