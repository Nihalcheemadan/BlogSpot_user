// export const baseUrl = 'http://localhost:5000/api' 

import axios from "axios";

const instance = axios.create({
    // baseURL: "https://www.server.blogsspot.site/api"
        baseURL: "http://localhost:5000/api"

})

export default instance;

