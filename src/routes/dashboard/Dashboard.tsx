import { useContext, useEffect } from "react";
import { Header } from "./components/Header"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { GeneralData } from "./components/generalData/GeneralData";
import { GlobalContext } from "../../context/GlobalContext";
import { ChangeForms } from "./components/changeForms/ChangeForms";
import { Form } from "./components/form/FormDashboard";
import { WorkModal } from "./components/workModal";

export function Dashboard() {

    const navigate = useNavigate()
    const { getData, workModalIsActive } = useContext(GlobalContext)
    
    useEffect(() => {
        getData()
        const token = Cookies.get('token')
        if(!token){
            return navigate('/')
        }
    },)

    return(
        <>
            { workModalIsActive &&
                <WorkModal />
            }
            <div className="h-full min-h-screen pb-16 bg-zinc-950">
                <Header goTo="/menu-inicial/colaboradores"/>
                <GeneralData />

                <div className="flex flex-col lg:flex-row items-center justify-center gap-24 mt-20">
                    <ChangeForms />
                    <div className="hidden lg:flex w-[1px] h-32 bg-zinc-500/20"></div>
                    <Form/>
                </div>
            </div>
        </>
    )
}