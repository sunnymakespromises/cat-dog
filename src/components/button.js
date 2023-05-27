import { useEffect } from 'react'

/* src/components/button.js */
export default function Button({ text, style, styles, isListener, classNames, onClick, children, ...extras }) {
    /* useEffect
     * @param []
     *
     * Sets a DOM keydown listener. Runs on page load.
     * - If the button is a listener, adds a DOM listener for keydowns.
     */
    useEffect(() => {
        if (isListener) {
            const listener = (e) => {
                if (e.code === 'Enter' || e.code === 'NumpadEnter') { // if key pressed is enter
                    e.preventDefault() // stop enter button from executing
                    onClick() // runs the onClick function
                }
            }
            document.addEventListener('keydown', listener) // adds the DOM keydown listener
            return () => {
                document.removeEventListener('keydown', listener) // removes the listener
            }
        }
    }, [onClick, isListener])


    let options = [
        {
            title: 'upload',
            classNames: 'w-full text-center relative transition-all ease-in-out border-main border-base-0 hover:scale-[1.02] md:hover:scale-[1.04] px-6 py-2',
            textClassNames: ''
        },
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
        <div className = {getOption()?.classNames + (classNames ? ' ' + classNames : '') + ' cursor-pointer'} style = {styles} onClick = {onClick} {...extras}>
            {text ? <p className = {getOption()?.textClassNames}>{text}</p> : null}
            {children ? children : null}
        </div>
    )
}