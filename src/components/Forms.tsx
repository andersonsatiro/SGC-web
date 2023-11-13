import { ClipboardPaste } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { api } from "../lib/axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"


export function Forms(){

  const {username, setUsername, password, setPassword} = useContext(GlobalContext)
  const [invalidData, setInvalidData] = useState(false)
  const navigate = useNavigate()
  
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    try {
      const response = await api.post('/login', {
        username,
        password
      })
      const currentData = new Date()
      const expirationTime = new Date(currentData.getTime() + 2 * 60 * 60 * 1000)
      Cookies.set('token', response.data.token, {expires: expirationTime})
      return navigate('/dashboard')

    } catch(error) {
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
            data-invalidData={invalidData}
            type="text"
            className='p-3 min-w-[280px] bg-zinc-950 border-[1px] border-solid
            border-zinc-400 rounded-md text-zinc-400 text-xs font-medium data-[invalidData=true]:border-red-400'
            placeholder='Usuário'
            onChange={handleUsername}
          />
          <input
            data-invalidData={invalidData}
            type="password"
            className='p-3 min-w-[280px] bg-zinc-950 border-[1px] border-solid
          border-zinc-400 rounded-md text-zinc-400 text-xs font-medium data-[invalidData=true]:border-red-400'
            placeholder='Senha'
            onChange={handlePassword}
          />
        </div>
    
        <div  className='flex flex-col items-center gap-3 w-full'>
          <div className='w-full flex items-center gap-3'>
            <div className='w-full border-[.5px] border-solid border-zinc-500 bg-green-100'></div>
            <p
              data-invalidData={invalidData}
              className='text-xs font-medium text-zinc-400 whitespace-nowrap data-[invalidData=true]:text-red-300'
              >
              {invalidData ?
              'Reveja os dados e envie novamente' :
              'ir para a página principal'
              }
            </p>
            <div className='w-full border-[.5px] border-solid border-zinc-500 bg-green-100'></div>
          </div>

          <button onClick={submitForm} className='w-full text-white text-sm font-bold p-3 bg-indigo-500 rounded-md hover:bg-indigo-400'>Entrar</button>
        </div>
      </form>
  )
}