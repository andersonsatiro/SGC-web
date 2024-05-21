import { useContext } from "react"
import { GlobalContext } from "../../../../context/GlobalContext"
import { TableTitle } from "./TableTitle"
import { ArrowUp01, Briefcase, Coins, Square, User, WholeWord } from "lucide-react"
import { useMediaQuery } from "react-responsive"

interface TableProps {
  sendingData: boolean,
  changeTrashItems: (id: string) => {},
  trashItems: string[],
  transformToReal: (value: number) => string 
}


export function Table({sendingData, changeTrashItems, trashItems, transformToReal}: TableProps) {

  const {listedCollaborators} = useContext(GlobalContext)

  //const screenLarge = useMediaQuery({minWidth: 1008})
  const screenMedium = useMediaQuery({minWidth: 641, maxWidth: 1007})
  const screenSmall = useMediaQuery({maxWidth: 640})

  return(
    <div
      className={`border-solid border-[1px] border-zinc-500/40 mx-16 rounded-lg
        ${screenMedium && 'mx-6'}
        ${screenSmall && 'mx-3'}
      `}
    >
      <header className="flex items-center border-b-[1px] border-b-solid border-b-zinc-500/10">
        <Square
          className={`border-solid border-[1px] border-zinc-400 w-4 h-4 cursor-pointer hover:border-zinc-200 mx-10 rounded-sm
          ${screenSmall && 'w-2.5 h-2.5 mx-0 mr-1 ml-3'}
          `}
        />

        <div
          className={`flex items-start py-4 w-full
          ${screenMedium && 'text-xs'}
          ${screenSmall && 'text-[0.57rem]'}
          `}
        >
          <TableTitle name="nome" icon={WholeWord}/>
          <TableTitle name="emprego" icon={Briefcase}/>
          <TableTitle name="liderança" icon={User}/>
          <TableTitle name="salário" icon={Coins}/>
          <TableTitle name="influência" icon={ArrowUp01}/>
        </div>
      </header>

      <main>
        {listedCollaborators.map(({name, jobRole, salary, influence, leaderName, id}, index) => (
          <div
            key={index}
            className={`flex items-center text-xs
            ${index !== listedCollaborators.length - 1 && ('border-b-[1px] border-b-solid border-b-zinc-500/30')} 
            ${trashItems.includes(id) ? sendingData ? 'animate-pulse duration-1000 bg-zinc-900' : 'bg-zinc-900' : ''}
            ${screenMedium && 'text-[0.57rem]'}
            ${screenSmall && 'text-[0.46rem]'}
            `}
          >
              <div
                  onClick={() => changeTrashItems(id)}
                  className={`border-solid border-[1px] border-zinc-400 w-4 h-4 cursor-pointer hover:border-zinc-200 mx-10 rounded-sm
                  ${trashItems.includes(id) && 'border-none bg-indigo-600 hover:bg-indigo-600'}
                  ${screenSmall && 'w-2.5 h-2.5 mx-0 mr-1 ml-3'}
                  `}
              />
              <div className={`${index % 2 == 0 ? 'text-gray-200' : 'text-indigo-400 '}
                              flex items-center py-4 w-full font-semibold`}>
                  <p className="flex justify-center w-1/5 text-center leading-3">{name}</p>
                  <p className="flex justify-center w-1/5 text-center leading-3">{jobRole}</p>
                  <p className="flex justify-center w-1/5 text-center leading-3">{leaderName}</p>
                  <p className="flex justify-center w-1/5 text-center leading-3">{transformToReal(salary)}</p>                                   
                  <p className="flex justify-center w-1/5 text-center leading-3"> peso {Number(influence.toFixed(2))}</p>
              </div>
          </div>
        ))}
      </main>
    </div>
  )
}