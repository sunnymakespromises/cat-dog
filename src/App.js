/* eslint-disable react/style-prop-object */
import './App.css'
import Graph from './components/graph'
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
        <div className = 'transition-all relative w-screen h-screen flex flex-col items-center p-4 md:p-8 bg-reverse-100 overflow-hidden overscroll-none'>
            <div id = 'body' className = 'relative w-full h-full flex flex-col justify-center border-main border-base-0'>
                <Graph points = {data} onUpload = {onUpload}/>
            </div>
        </div>
    )
}

export default App
