import { List } from "lucide-react";
import { Header } from "../components/Header";
import { LeadersFilter } from "./components/LeadersFilter";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

export function Leaders(){

  const { leadersFilterIsActive, listedLeaders, leaders } = useContext(GlobalContext)
  return(
    <div className="flex flex-col gap-14 h-full min-h-screen bg-zinc-950 pb-16">
      <Header goTo="/menu-inicial" />
            
      <section className="flex items-center justify-between px-16">

        <div className='flex items-center justify-center gap-2'>
          <List className='text-zinc-400 h-5 w-5' />
          <h1 className='text-zinc-300 text-2xl font-bold'>
              Lista das lideranças
              <p className="text-xs text-zinc-500 font-medium">
                {leadersFilterIsActive
                  ?
                      `com o filtro ativado, ${listedLeaders.length} das
                      ${leaders.length} lideranças estão listadas`
                  :
                      `nenhum filtro ativado, portanto, todas as ${leaders.length} lideranças estão listadas`
                }
              </p>   
          </h1>
        </div>
        <LeadersFilter />

      </section>
    </div>
  )
}