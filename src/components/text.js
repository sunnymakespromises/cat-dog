/* src/components/text.js */
export default function Text({ style, styles, classNames, children, ...extras }) {
    let options = [
        { 
            title: 'main', 
            classNames: 'select-none contents whitespace-nowrap transition-all ease-in-out font-main text-3xl md:text-3xl text-reverse-0 dark:text-base-0'
        },
        { 
            title: 'info-value', 
            classNames: 'select-none whitespace-nowrap transition-all ease-in-out font-main text-3xl md:text-5xl text-reverse-0 dark:text-base-0'
        },
        { 
            title: 'info-key', 
            classNames: 'select-none transition-all ease-in-out font-main text-xl md:text-3xl text-reverse-0 dark:text-base-0'
        },
        { 
            title: 'graph-axis', 
            classNames: 'select-none whitespace-nowrap transition-all ease-in-out font-main text-base md:text-xl text-reverse-0 dark:text-base-0'
        },
        { 
            title: 'graph-label', 
            classNames: 'select-none whitespace-nowrap transition-all ease-in-out font-main text-center text-sm md:text-lg text-reverse-0 dark:text-base-0 text-shadow-sm'
        }
    ]

    /* getOption
     * 
     * Gets the option given by the style parameter.
     * - Searches through optioins and returns the option whose title matches the 
     *   style parameter.
     */
    const getOption = () => {
        return options.find((option) => { // searches through options
            return option.title === style // returns option whose title matches the style parameter
        })
    }

    return (
        <p className = {getOption()?.classNames + (classNames ? ' ' + classNames : '')} style = {styles} {...extras}>{children}</p>
    )
}