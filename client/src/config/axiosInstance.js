import axios from 'axios'

let baseURL

if (import.meta.env.MODE === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000/api'
}
if(import.meta.env.MODE === 'production') {
    axios.defaults.baseURL = import.meta.env.baseURL
}

export const socketioURL = import.meta.env.MODE === 'production' ? import.meta.env.baseURL : 'http://localhost:4000'
const instance = axios.create({
    // baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

export default instance