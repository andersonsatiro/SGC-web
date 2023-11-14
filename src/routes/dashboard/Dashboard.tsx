import { useContext, useEffect } from "react";
import { Header } from "./components/Header"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { GeneralData } from "./components/generalData/GeneralData";
import { GlobalContext } from "../../context/GlobalContext";
import { ChangeForms } from "./components/changeForms/ChangeForms";
import { Form } from "./components/form/Form";

export function Dashboard() {

    const navigate = useNavigate()
    const { getData } = useContext(GlobalContext)

    useEffect(() => {
        getData()
        const token = Cookies.get('token')
        if(!token){
            return navigate('/')
        }
    },)

    return(
        <div className="h-screen bg-zinc-950">
            <Header />
            <GeneralData />

            <div className="flex items-center justify-center gap-24 mt-20">
                <ChangeForms />
                <div className="w-[1px] h-32 bg-zinc-500/20"></div>
                <Form />
            </div>
        </div>
    )
}