/* src/components/input.js */
export default function Input({ value, status, type, style, styles, classNames, onChange, ...extras }) {
    /* NOTE
     * status can be one of three values: true, false, and null
     * true = valid/green
     * false = error/red
     * null = nothing
     */
    let options = [
        { 
            title: 'main', 
            classNames: 'transition-all ease-in-out text-base-0 text-3xl bg-black bg-opacity-30 focus:outline-none px-3 py-2 rounded-xl',
            trueStatus: 'bg-emerald-50 border border-emerald-500 text-emerald-900',
            falseStatus: 'bg-rose-900 border border-4 border-rose-500',
            nullStatus: 'border border-4 border-transparent'
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
        <input className = {'font-main w-min ' + getOption()?.classNames + (status === false ? ' ' + getOption()?.falseStatus : '') + (status === true ? ' ' + getOption()?.trueStatus : '') + (status === null ? ' ' + getOption()?.nullStatus : '') + (classNames ? ' ' + classNames : '')} style = {styles} value = {value} type = {type} onChange = {onChange} {...extras}></input>
    )
}