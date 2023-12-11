import './App.css'
import ListOfUsers from './components/listOfUsers'
import {NewUser} from './components/newUser'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
    <h1>Redux</h1>
    <ListOfUsers></ListOfUsers>
    <NewUser></NewUser>
    <Toaster />
    </>
  )
}

export default App
