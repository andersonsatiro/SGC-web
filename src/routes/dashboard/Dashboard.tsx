import { useEffect } from "react";
import { Header } from "./components/Header"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get('token')
        if(!token){
            return navigate('/')
        }
    },)

    return(
        <div className="h-screen bg-zinc-950">
            <Header />  
        </div>
    )
}