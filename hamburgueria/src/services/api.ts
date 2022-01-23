import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://hamburgueria-kenzie-refatorada.herokuapp.com/',
})