/* eslint-disable react/style-prop-object */
import './App.css'
import Graph from './components/graph'
import { useEffect, useState } from 'react'
import Text from './components/text'
import { TypeAnimation } from 'react-type-animation'

function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/api/data/data.json')
            .then(response => response.json())
            .then(res => setData(res))
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
            <div id = 'screen' className = 'flex flex-col gap-4 w-full h-full overflow-auto overscroll-none'>
                <div id = 'intro' className = 'w-full flex flex-col gap-1'>
                    <Text style = 'title'>
                        <TypeAnimation
                            sequence={[
                                "catdog"
                            ]}
                            cursor={true}
                            speed={80}
                        />
                    </Text>
                    <Text style = 'subtitle'>
                        inspired by <a href = 'https://twitter.com/sonnen_konig/status/1657711956743139332?s=46&t=tdKjigfuSqFFkKoOpXqGkg' className = 'text-blue-500 underline'>this tweet</a>, 
                        catdog is a silly little neural network that classifies animals as being either dog, cat, or snake.
                        you can also upload your own pictures and see how the network classifies it :3
                    </Text>
                </div>
                <div id = 'body' className = 'relative w-full h-full flex flex-col justify-center border-main border-base-0'>
                    <Graph points = {data} onUpload = {onUpload}/>
                </div>
            </div>
        </div>
    )
}

export default App
