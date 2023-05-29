/* eslint-disable react/style-prop-object */
import Text from './text'
import Button from './button'
import { useRef, useState } from 'react'
const api = 'https://cat-dog-48il4jap4-sunnymakespromises.vercel.app/'

/* src/components/upload.js */
export default function Upload({onUpload}) {
    const inputButton = useRef(null)
    const [error, setError] = useState('')

    async function handleUpload(event) {
        const file = event.target.files[0]
        if (file != null) {
            const data = new FormData()
            data.append('file', file)
            await fetch(api, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(response => {
                onUpload(file, response)
                setError(response.message)
                const timer = setTimeout(() => {setError('')}, 5000)
                return () => clearTimeout(timer)
            })
        }
    }

    return (
        <div id = 'graph-upload' className = 'w-full h-min'>
            <input style = {{ display: 'none' }} type = 'file' onChange = {handleUpload} ref = {inputButton}/>
            <Button style = 'upload' onClick = {() => inputButton.current.click()}>
                <Text style = 'main'>
                    Upload
                </Text>
            </Button>
            <Text style = 'upload-error'>
                {error}
            </Text>
        </div>
    )
}