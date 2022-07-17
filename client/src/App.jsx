import { useEffect, useState } from "react"
import io from "socket.io-client"
import { Container } from "semantic-ui-react"
import HeadContent from "./components/Header"
import TableUser from "./components/UsersTable"
import { addUser, getUsers, removeUser, updateUser } from "./store/actions"
import { useDispatch } from "react-redux"
import axios from './config/axiosInstance'

const socket = io.connect(window.location.origin)

function App(props) {
  console.log(window.location.origin, "socketio")
  console.log(import.meta.env)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleUserUpdated = (user, type) => {
    if(type === "New"){
      // post new user logic here
      socket.emit("addNew", user)
   
    }
    else {
      // update logic here
      socket.emit("update", user)
     
    }
  }

  const handleUserDeleted = (id) => {
    // delete logic here
    dispatch(removeUser(id))
    socket.emit("delete", id)
  }

  useEffect(() => {
    socket.on("recieve_addNew", (data) => {
      dispatch(addUser(data))
    })
    socket.on("recieve_update", (data) => {
      dispatch(updateUser(data))
    })
    socket.on("deletion_id", (data) => {
      dispatch(removeUser(data))
    })
  }, [socket])

  useEffect(() => {
    setLoading(true)
    axios
    .get('/users')
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.statusText)
      }
      return res.data
    })
    .then((result) => {
      setLoading(false)
      dispatch(getUsers(result))
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])


  return (
    <div style={{ margin: "2em auto" }}>
      <Container>
        <HeadContent />
        <TableUser
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
          loading={loading}
        />
        
      </Container>
    </div>
  )
}

export default App
