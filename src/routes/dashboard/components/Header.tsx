import { BarChart4, LogOut, ChevronsRight, ChevronsLeft } from 'lucide-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ShowLeaders } from './ShowLeaders'
import { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'
import { useMediaQuery } from 'react-responsive'

interface headerProps {
    goTo: string,
}

export function Header({goTo}: headerProps) {
    const screenSmaller768 = useMediaQuery({maxWidth: 767})
    const screenSmaller312 = useMediaQuery({maxWidth: 311})
    const logoutText = screenSmaller768 ? 'SGC' : 'Sistema de Gestão de Cargos'

    const navigate = useNavigate()

    const { setListedCollaborators, collaborators, callingDB} = useContext(GlobalContext)

    const logout = () => {
        Cookies.remove('token')
        return navigate('/')
    }

    const changeRoute = () => {
        setListedCollaborators(collaborators)
        return navigate(goTo)      
    }
    
    return(
        <header
            className="flex items-center justify-between px-5 h-20 border-b-solid
            border-b-2 border-b-zinc-500/20 text-zinc-200 font-bold
            text-xs">
            <div className='flex items-center gap-4 sm:gap-7 font-bold'>
                <ShowLeaders/>

                {screenSmaller312
                    ?
                        <ChevronsRight
                            className='h-5 w-5'
                            strokeWidth={1}
                            onClick={changeRoute}
                        />
                    :
                        <button
                            className={`flex items-center justify-center gap-2 p-3
                            max-w-[50px] sm:min-w-[170px] sm:justify-between 
                            border-solid border-[1px] border-zinc-500/20 rounded-md
                            cursor-pointer hover:bg-zinc-900/90 font-bold
                            ${callingDB && 'hover:cursor-not-allowed'}`}
                            disabled={callingDB}
                            onClick={changeRoute}
                        >
                            <ChevronsRight className='h-5 w-5' strokeWidth={1}/>
                            <h2 className='hidden sm:flex'>
                                {goTo == '/menu-inicial' ? 'Menu inicial' : 'Colaboradores'}
                            </h2>
                            <ChevronsLeft className='hidden sm:flex h-5 w-5' strokeWidth={1} />
                        </button> 
                    }              
            </div>

            {screenSmaller312
                ?
                    <LogOut
                        className='h-3.5 w-3.5 text-red-500'
                        strokeWidth={3}
                        onClick={logout}
                    />
                :
                    <div
                        className="flex items-center gap-3 p-3 max-w-[250px]
                        border-solid border-[1px] border-zinc-500/20 rounded-md
                        cursor-pointer hover:bg-zinc-900/90 font-medium"
                        onClick={logout}
                        >

                        <BarChart4 className='hidden sm:flex h-3.5 w-3.5' strokeWidth={1} />
                        <h2 className= 'hidden sm:flex whitespace-nowrap'>
                            {logoutText}
                        </h2>
                        <LogOut className='h-3.5 w-3.5 text-red-500' strokeWidth={3}/>
                    </div>
            }
        </header>
    )
}