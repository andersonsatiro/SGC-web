import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://sgc-api-deploy.onrender.com',
})