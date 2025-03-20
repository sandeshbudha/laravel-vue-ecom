/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        screen: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
        },
        container: {
            center: true,
            padding: "1rem",
        },

        extend: {
            keyframes: {
                'fade-in-down': {
                    "from": {
                        transform: "translateY(-0.75rem)",
                        opacity: '0'
                    },
                    "to": {
                        transform: "translateY(0rem)",
                        opacity: '1'
                    },
                },
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
            },

            animation: {
                'fade-in-down': "fade-in-down 0.2s ease-in-out both",
            },

            colors: {
                primary: "#fd3d57",
            },
        },
        plugins: [
            require('@tailwindcss/forms'),
        ],
    }
}
