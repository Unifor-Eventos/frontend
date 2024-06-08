import axios from "@/lib/axios"
import csrf from "./csrf"

async function list(params) {
    await csrf()

    return axios.get('/events', { ...params })
}

export default { list }
