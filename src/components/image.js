/* src/components/image.js */
export default function Image({ path, styles, classNames, ...extras }) {
    return (
        <div className = {'bg-center bg-contain bg-no-repeat' + (classNames ? ' ' + classNames : '')} style = {{ backgroundImage: 'url(/img/' + path + ')', ...styles}} {...extras}/>
    )
}