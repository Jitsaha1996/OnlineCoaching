
import './App.css'
import { Header } from './components/Header'
import { Home } from './components/Home'
import NavBar from './components/NavBar'
import { Test } from './components/Test'

function App() {
 

  return (
    <>
  <NavBar/>
      <h1>
        My Online Coaching
      </h1>
      <Home/>
      <Test/>
      <Header/>
      
    </>
  )
}

export default App
