/* eslint-disable react/style-prop-object */
import './App.css'
import Graph from './components/graph'
import Image from './components/image'
import Upload from './components/upload'
import { useEffect, useState } from 'react'

function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/getdata').then(res => res.json()).then(data => {
            setData(data)
        })
    }, [])

    function onUpload(file, newData) {
        if (newData.status) {
            setData([...data, {
                ...newData.data,
                'img': URL.createObjectURL(file),
                'user': true
            }])
        }
    }

    return (
        <div className = 'transition-all relative w-screen h-screen flex flex-col items-center p-4 md:p-8 bg-gradient-to-b from-cyan-500 to-indigo-500 dark:from-violet-400 dark:to-pink-400 overflow-hidden overscroll-none'>
            <div className = 'absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat bg-[url(../public/img/bg-light.png)] dark:bg-[url(../public/img/bg-dark.png)]'/>
            <div id = 'body' className = 'relative w-full h-full flex flex-col justify-center rounded-xl'>
                <div className = 'absolute top-0 left-0 w-full h-full backdrop-brightness-110 backdrop-blur-2xl rounded-xl'/>
                <Graph points = {data} onUpload = {onUpload}/>
            </div>
        </div>
    )
}

export default App
