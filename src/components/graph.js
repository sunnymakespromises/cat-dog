/* eslint-disable react/style-prop-object */
import Image from './image'
import { useEffect, useState } from 'react'
import Text from './text'
import Button from './button'
import Upload from './upload'

/* src/components/graph.js */
export default function Graph({points, onUpload}) {
    const [currentPoint, setCurrentPoint] = useState({
        'name': '',
        'probabilities': {
            'dog': 0,
            'cat': 0,
            'snake': 0
        },
        'category': '',
        'img': ''
    })

    function onPointChange(point) {
        setCurrentPoint(point)
    }

    useEffect(() => {
        if (points.length > 0) {
            setCurrentPoint(points[points.length - 1])
        }
    }, [points])

    return (
        <div id = 'container' className = 'w-full h-full flex flex-col md:flex-row z-10 rounded-xl'>
            <div id = 'graph-container' className = 'relative h-full w-full flex flex-col md:flex-row p-6 md:p-12'>
                <Text style = 'graph-axis' classNames = 'absolute bottom-0 left-4 md:bottom-4 md:left-12'>cat</Text>
                <Text style = 'graph-axis'  classNames = 'absolute bottom-0 right-4 md:bottom-4 md:right-12'>dog</Text>
                <Text style = 'graph-axis'  classNames = 'absolute top-2 left-[50%] md:top-2'>snake</Text>
                <div id = 'graph-plane' className = 'relative w-full h-full'>
                    {points ? points?.map((point, index) => {
                        return (
                            <Point key = {index} point = {point} onClick = {onPointChange}/>
                        )
                    }) : null}
                </div>
            </div>
            <div id = 'graph-info' className = 'md:h-full md:flex-1 h-min w-full p-4 flex flex-col gap-4'>
                <Info point = {currentPoint}/>
                <Upload onUpload = {onUpload}/>
            </div>
        </div>
    )
}

function Point({point, onClick}) {
    let cat = point.probabilities.cat
    let dog = point.probabilities.dog
    let snake = point.probabilities.snake
    const color = () => {
        let r = Math.round((dog / 100) * 255)
        let g = Math.round((snake / 100) * 255)
        let b = Math.round((cat / 100) * 255)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    return (
        <div className = {'group transition-all absolute hover:z-10 hover:scale-110 h-4 md:h-6 aspect-square rounded-full flex flex-col justify-center items-center cursor-pointer ' + (point.name === 'your image' ? 'brightness-[3]' : 'brightness-[2]')} style = {{ left: (((dog - cat) / 2) + 50) + '%', bottom: snake + '%', backgroundColor: color() }} onClick = {() => onClick(point)}>
            <Text style = 'graph-label' classNames = 'absolute hidden group-hover:flex'>
                {point.name}
            </Text>
        </div>
    )
}

function Info({point}) {
    return (
        <div id = 'graph-info-container' className = 'w-full h-min flex flex-row md:flex-col justify-between md:justify-start gap-4'>
        {point?.user ?
            <div id = 'graph-info-image' className = 'w-full aspect-square rounded-xl bg-center bg-no-repeat bg-cover' style = {{ backgroundImage: 'url(' + point?.img + ')'}}/>
        :
            // <Image id = 'graph-info-image' path = {point?.img} classNames = 'h-28 md:h-40 aspect-square rounded-xl !bg-cover'/>
            null
        }
            <div id = 'graph-info-text' className = 'flex flex-col gap-0.5 md:gap-4'>
                <div id = 'graph-info-name' className = 'flex flex-col'>
                    <Text style = 'info-key'>{point?.name ? point?.name + ' is a ' + point?.category: ''}</Text>
                </div>
                <div id = 'graph-info-probabilities' className = 'flex flex-col gap-2'>
                {Object.keys(point?.probabilities)?.map((probability, index) => {
                    return (
                        <div key = {index} id = {'graph-info-' + probability} className = 'flex flex-col gap-0 md:gap-2'>
                            <div id = {'graph-info-' + probability + '-text'} className = 'flex flex-row items-baseline gap-2'>
                                <Text style = 'info-value'>{point.probabilities[probability].toFixed(2) + '%'}</Text>
                                <Text style = 'info-key'>{probability}</Text>
                            </div>
                            <div id = {'graph-info-' + probability + '-bar'} className = {'transition-all ' + (point.probabilities[probability] !== 0 ? 'h-2 md:h-4' : 'h-0') + ' bg-white rounded-xl'} style = {{ width: point.probabilities[probability].toFixed(2) + '%' }}/>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}