import { useContext } from 'react'
import { GlobalContext } from '../../../../context/GlobalContext'
import { FullForm } from './FullForm'
import { Loading } from '../../../../components/Loading'

export function Form() {
    const { leaderFormIsActive, leaders } = useContext(GlobalContext)

    return(
        <>
            {!leaderFormIsActive && leaders[0] == null
                ?                  
                    <Loading />
                :
                    <FullForm/>
            }
        </>
    )
} 