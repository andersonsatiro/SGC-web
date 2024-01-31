import { Trophy } from "lucide-react";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalContext";
import { RightBoxBefore } from "./RightBoxBefore";

interface propsRightBox {
    title: string,

    nameOfTheFirst: string,
    numberOfTheFirst: number,
    monthlyIncomeOfTheFirst: number,

    nameOfTheSecond: string,
    numberOfTheSecond: number,
    monthlyIncomeOfTheSecond: number
}

export function RightBox({
    title,
    nameOfTheFirst,
    numberOfTheFirst,
    monthlyIncomeOfTheFirst,
    nameOfTheSecond,
    numberOfTheSecond,
    monthlyIncomeOfTheSecond,
}: propsRightBox) {

    const { dataExists } = useContext(GlobalContext)

    const transformToReal = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    }

    return (
        <>
            {dataExists ?
                <div className='w-72 h-32 border-solid border-[1px] border-zinc-500 rounded hover:bg-zinc-900/70 cursor-pointer'>
                    <header className='h-1/3 flex items-center justify-between px-3 py-4 border-b-solid border-b-[1px] border-b-zinc-500/30'>
                        <h2 className='text-xs text-zinc-400 font-bold'>{title}</h2>
                        <Trophy className='w-3 h-3 text-zinc-400' />
                    </header>

                    <main className='flex h-2/3'>
                        <div className='flex flex-col items-center gap-2 justify-center w-1/2 h-full border-r-solid border-r-[1px] border-r-zinc-500/30'>
                            <div className='flex flex-col items-center'>
                                <h3 className='text-[10px] text-indigo-400 font-semibold leading-3'>{nameOfTheFirst}</h3>
                                <h3 className='text-[10px] text-zinc-400 font-semibold'>possui <span className='text-xs'>{Number(numberOfTheFirst.toFixed(2))}</span></h3>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h3 className='text-zinc-400 text-[10px] font-semibold leading-3'>receita mensal</h3>
                                <h2 className='text-green-500 text-[10px] font-semibold'>{transformToReal(monthlyIncomeOfTheFirst)}</h2>
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-2 justify-center w-1/2 h-full'>
                            <div className='flex flex-col items-center'>
                                <h3 className='text-[10px] text-indigo-400 font-semibold leading-3'>{nameOfTheSecond}</h3>
                                <h3 className='text-[10px] text-zinc-400 font-semibold'>possui <span className='text-xs'>{Number(numberOfTheSecond.toFixed(2))}</span></h3>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h3 className='text-zinc-400 text-[10px] font-semibold leading-3'>receita mensal</h3>
                                <h2 className='text-green-500 text-[10px] font-semibold'>{transformToReal(monthlyIncomeOfTheSecond)}</h2>
                            </div>
                        </div>
                    </main>
                </div>
            :
                <RightBoxBefore />
            }
        </>
    )
}