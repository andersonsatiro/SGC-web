import { ClipboardPaste } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { api } from "../lib/axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { Loading } from "./Loading"


export function Forms(){

  const {username, setUsername, password, setPassword} = useContext(GlobalContext)
  const [invalidData, setInvalidData] = useState(false)
  const [gettingData, setGettingData] = useState(false)
  const navigate = useNavigate()
  
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGettingData(true)

    try {     
      const response = await api.post('/login', {
        username,
        password
      })
      const currentData = new Date()
      const expirationTime = new Date(currentData.getTime() + 2 * 60 * 60 * 1000)
      Cookies.set('token', response.data.token, {expires: expirationTime})
      
      setGettingData(false)
      return navigate('/menu-inicial')

    } catch(error) {
      setGettingData(false)
      setInvalidData(true)
    }
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setInvalidData(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [invalidData])

  return(
      <form className='flex items-center justify-center flex-col gap-6'>
        <ClipboardPaste className='text-zinc-400 w-6 h-6' />
        <div className='flex flex-col gap-2'>
          <input
            data-invalid-data={invalidData}
            type="text"
            className='p-3 min-w-[280px] bg-zinc-950 border-[1px] border-solid
            border-zinc-400 rounded-md text-zinc-400 text-xs font-medium data-[invalid-data=true]:border-red-400'
            placeholder='Usuário'
            onChange={handleUsername}
          />
          <input
            data-invalid-data={invalidData}
            type="password"
            className='p-3 min-w-[280px] bg-zinc-950 border-[1px] border-solid
          border-zinc-400 rounded-md text-zinc-400 text-xs font-medium data-[invalid-data=true]:border-red-400'
            placeholder='Senha'
            onChange={handlePassword}
          />
        </div>
    
        <div  className='flex flex-col items-center gap-3 w-full'>
          <div className='w-full flex items-center gap-3'>
            <div className='w-full border-[.5px] border-solid border-zinc-500 bg-green-100'></div>
            <p
              data-invalid-data={invalidData}
              className='text-xs font-medium text-zinc-400 whitespace-nowrap data-[invalid-data=true]:text-red-300'
              >
              {
                gettingData
                ? 'Isso pode levar até um minuto...'
                : invalidData
                ? 'Reveja os dados e envie novamente'
                : 'ir para a página principal'
              }
            </p>
            <div className='w-full border-[.5px] border-solid border-zinc-500 bg-green-100'></div>
          </div>

          <button
            disabled={gettingData ? true : false}
            onClick={submitForm}
            className={`flex items-center justify-center w-full text-white text-sm font-bold p-3 rounded-md
            ${ gettingData ? 'bg-zinc-700 cursor-not-allowed hover:bg-zinc-800' : 'bg-indigo-500 hover:bg-indigo-400'}`}>               
              { gettingData
              ? 
                <Loading />
              : 
                <p>entrar</p>
              }
          </button>

        </div>
      </form>
  )
}