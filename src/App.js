/* eslint-disable react/style-prop-object */
import './App.css'
import Text from './components/text'
import Image from './components/image'
import { useEffect, useState } from 'react'

function App() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/getdata').then(res => res.json()).then(data => {
            setData(data)
        })
    }, [])

    return (
        <div className = 'w-screen h-screen flex flex-col items-center p-4 bg-gradient-to-b dark:from-cyan-500 dark:to-indigo-500 from-violet-400 to-pink-400 overflow-hidden overscroll-none'>
            <div id = 'header' className = 'flex justify-center h-24 w-full'>
                <Image path = 'logo.png' classNames = 'h-full aspect-square'/>
            </div>
            <div id = 'body' className = 'w-full h-full flex flex-col justify-center items-center'>
                <div id = 'chart-container' className = 'w-[80%] h-[90%] backdrop-blur-lg backdrop-brightness-110 shadow-lg rounded-xl'>

                </div>
            </div>
        </div>
    )
}

export default App
