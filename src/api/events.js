import axios from "@/lib/axios"
import csrf from "./csrf"

async function list(params) {
    await csrf()

    return axios.get('/events', { ...params })
}

async function getById(id, params) {
    await csrf()

    return axios.get(`/events/${id}`, { ...params })
}

async function update(id, data, file) {
    await csrf()

    if (file) {
        updateImage(id, file)
    }

    return axios.patch(`/events/${id}`)
}

async function updateImage(id, file) {
    await csrf()

    const formData = new FormData()
    formData.append('banner', file)

    return axios.post(`/events/${id}/banner`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


async function remove(id) {
    await csrf()

    return axios.delete(`/events/${id}`)
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

async function enroll(id, data, file) {
    await csrf()

    const formData = new FormData()

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key])
        }
    }

    if (file) {
        formData.append('resume_file', file)
    }

    return axios.post(`/events/${id}/enrolls`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

async function acceptEnroll(eventId, userId) {
    await csrf()

    return axios.post(`/events/${eventId}/enrolls/accept`, { "user_id": userId })
}

async function rejectEnroll(eventId, userId) {
    await csrf()

    return axios.post(`/events/${eventId}/enrolls/reject`, { "user_id": userId })
}

async function listEnroll(eventId, params) {
    await csrf()

    return axios.get(`/events/${eventId}/enrolls`, { ...params })
}

export default { list, create, update, enroll, getById, remove, listEnroll, acceptEnroll, rejectEnroll };
