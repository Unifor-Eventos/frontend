import axios from "@/lib/axios"
import csrf from "./csrf"

async function list(params) {
    await csrf()

    return axios.get('/events', { ...params })
}

async function create(data, file) {
    await csrf()

    const formData = new FormData()

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key])
        }
    }

    if (file) {
        formData.append('banner', file)
    }

    return axios.post('/events', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export default { list, create }
