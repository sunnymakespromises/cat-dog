/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'main': ['JetBrains Mono', 'sans-serif']
            },
            colors: {
                transparent: 'transparent',
                base: {
                    0: '#fffdf7',
                    100: '#fffaeb'
                },
                reverse: {
                    0: '#202020',
                    100: '#141414'
                },
            }
        },
    },
    plugins: [],
}

