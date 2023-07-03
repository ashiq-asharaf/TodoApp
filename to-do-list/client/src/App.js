import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth  from "./components/Auth"
import {useEffect, useState} from "react"
import { useCookies } from "react-cookie"

const App = () => {
  const [ cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const [tasks,setTasks] = useState(null)
  const userEmail = cookies.Email
  // const authToken = false
  const getData = async () => {

    try {
       const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
       const json = await response.json()
       setTasks(json)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(authToken) {
      getData()
    }
  } , [])

  console.log(tasks)
  console.log(new Date())

  //sort by date
  const sortedTask = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className = "app">
      {!authToken && <Auth />}
      {authToken && <>
      <ListHeader listName = {"Holiday Tick List"} getData={getData}/>
      <p className = "user-email">Welcome back {userEmail}</p>
      {sortedTask?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
      <p className = "copy-right">Creative Coding LLC</p>
    </div>
  )
}

export default App
