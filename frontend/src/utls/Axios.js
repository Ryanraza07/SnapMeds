import axios from "axios";
import SummaryApi, { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})


// REQUEST INTERCEPTOR
Axios.interceptors.request.use(
    async (config) => {

        const accessToken = localStorage.getItem('accesstoken')

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)


// RESPONSE INTERCEPTOR
Axios.interceptors.response.use(
    (response)=>{
        return response
    },

    async(error)=>{

        const originalRequest = error.config

        if(error.response.status === 401 && !originalRequest.retry){

            originalRequest.retry = true

            const refreshToken = localStorage.getItem('refreshToken')

            if(refreshToken){

                const newAccessToken = await refreshAccessToken(refreshToken)

                if(newAccessToken){

                    originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`

                    return Axios(originalRequest)
                }
            }
        }

        return Promise.reject(error)
    }
)


// REFRESH TOKEN FUNCTION
const refreshAccessToken = async(refreshToken)=>{

    try{

        const response = await Axios({
            ...SummaryApi.refreshToken,

            headers : {
                Authorization : `Bearer ${refreshToken}`
            }
        })

        const accessToken = response.data.data.accessToken

        localStorage.setItem('accesstoken', accessToken)

        return accessToken

    }catch(error){

        console.log(error)
    }
}

export default Axios