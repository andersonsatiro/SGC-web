import axios from 'axios'

export const api = axios.create({
    // PRODUÇÃO
    baseURL: 'https://sgc-api-deploy.onrender.com',
    // DESENVOLVIMENTO
    //baseURL: 'http://localhost:3333',
})