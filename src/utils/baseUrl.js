// export const baseUrl = 'http://localhost:5000/' 
// export const baseUrl = 'https:///'

import axios from "axios";

const instance = axios.create({
    baseURL: "https://www.server.blogsspot.site/api"
})

export default instance;