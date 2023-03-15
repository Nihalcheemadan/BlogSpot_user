import { Navigate } from "react-router-dom"
import instance from "../utils/baseUrl"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")
    if(token){
        instance
        .get("/user/authenticate",
        {headers : {
          Authorization : "Bearer " + localStorage.getItem("token"),
      }})
        .then((response) => {
          const user = response.data.user
          if(user.status === "blocked"){
            localStorage.clear()
            window.location.reload()
            return <Navigate to = {"/login"} replace = {true}></Navigate>
          }else{
            return children
          }
        })
    }else{
        return <Navigate to = {"/login"} replace = {true}></Navigate>
    }
   return children
}

export default ProtectedRoute
