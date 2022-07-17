import axios from 'axios'

let baseURL

if (import.meta.env.MODE === 'development') {
    axios.defaults.baseURL = import.meta.env.baseURL
}
if(import.meta.env.MODE === 'production') {
    axios.defaults.baseURL = 'http://localhost:4000/api'
}

export const socketioURL = import.meta.env.MODE === 'production' ? 'http://localhost:4000' : window.location.origin 
const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

export default instance