import './App.css'
import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'
 

export function App() {
  const { click, count } = useContext(GlobalContext)
  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={click}>{count} cliques</button>
    </div>
  )
}
