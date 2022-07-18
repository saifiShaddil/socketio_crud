import axios from 'axios'
import { io } from 'socket.io-client'

export const socket = io.connect(window.location.origin)

const instance = axios.create({
    baseURL: `${window.location.origin}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

export default instance