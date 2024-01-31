import { DatabaseBackup } from 'lucide-react'
import { LeftBox } from './LeftBox'
import { RightBox } from './RightBox'
import { useContext } from 'react'
import { GlobalContext } from '../../../../context/GlobalContext'
import { RightBoxBefore } from './RightBoxBefore'
import { useMediaQuery } from 'react-responsive'

export function GeneralData() {
    const { leaders, collaborators, leadersInfluence } = useContext(GlobalContext)

    const totalMoneyLeaders = () => {
        let sumOfIncome = 0
        for(let i = 0; i < leaders.length; i++) {
            sumOfIncome += leaders[i].monthlyIncome
        }
        return sumOfIncome    
    }

    const calculePerCapitaLeaders = () => {
        const response = leaders.length ?
        totalMoneyLeaders()/leaders.length : 0
        return response
    }

    const totalMoneyCollaborators = () => {
        let sumOfIncome = 0
        for(let i = 0; i < collaborators.length; i++) {
            sumOfIncome += collaborators[i].salary
        }
        return sumOfIncome 
    }

    const calculatePerCapitaCollaborators = () => {
        const response = collaborators.length ?
        totalMoneyLeaders()/collaborators.length : 0
        return response
    }
    
    const screenSmaller381 = useMediaQuery({maxWidth: 380})

    return (
        <div className={`flex flex-col gap-8 mt-16 ${screenSmaller381 ? 'px-2' : 'px-16'}`}>
            <div className='flex items-center justify-center gap-2'>
                <DatabaseBackup className='text-zinc-400 h-5 w-5' />
                <h1
                    className={`text-zinc-300 ${screenSmaller381 ? 'text-xl' : 'text-2xl'} font-bold`}>
                    Dados Gerais
                </h1>
            </div>

            <div className='flex flex-wrap items-center justify-center gap-10'>
                <LeftBox numberOfPeople={leaders.length} position="Lideranças" monthlyIncome={totalMoneyLeaders()} perCapita={calculePerCapitaLeaders()}/>
                <LeftBox numberOfPeople={collaborators.length} position="Colaboradores" monthlyIncome={totalMoneyCollaborators()} perCapita={calculatePerCapitaCollaborators()}/>

                {leaders[1] && leadersInfluence[1]  ?
                    <>
                        <RightBox
                        title="Ranking por Colaboradores" nameOfTheFirst={leaders[0].name}
                        numberOfTheFirst={leaders[0].numberOfCollaborators} monthlyIncomeOfTheFirst={leaders[0].monthlyIncome}
                        nameOfTheSecond={leaders[1].name} numberOfTheSecond={leaders[1].numberOfCollaborators}
                        monthlyIncomeOfTheSecond={leaders[1].monthlyIncome}
                        />

                        <RightBox
                        title="Ranking por peso de Colaboradores" nameOfTheFirst={leadersInfluence[0].name}
                        numberOfTheFirst={leadersInfluence[0].averageInfluence} monthlyIncomeOfTheFirst={leadersInfluence[0].monthlyIncome}
                        nameOfTheSecond={leadersInfluence[1].name} numberOfTheSecond={leadersInfluence[1].averageInfluence}
                        monthlyIncomeOfTheSecond={leadersInfluence[1].monthlyIncome} /> 
                    </>
                : 
                    <>
                        <RightBoxBefore />
                        <RightBoxBefore />
                    </>
                }
            </div>
        </div>
    )
}