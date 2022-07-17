import axios from 'axios'

const instance = axios.create({
    baseURL: window.Location.origin + '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

export default instance