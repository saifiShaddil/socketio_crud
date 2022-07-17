import axios from 'axios'

if (import.meta.env.MODE === 'development') {
    axios.defaults.baseURL = 'http://localhost:4000/api'
}
if(import.meta.env.MODE === 'production') {
    axios.defaults.baseURL = window.Location.origin + '/api'
}

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

export default instance