/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            borderWidth: {
                'main': '2px'
            },
            fontFamily: {
                'main': ['JetBrains Mono', 'sans-serif']
            },
            colors: {
                transparent: 'transparent',
                base: {
                    0: '#E7E9EF',
                    100: '#DADDE7'
                },
                reverse: {
                    0: '#101119',
                    100: '#000814'
                },
            }
        },
    },
    plugins: [],
}

