import React, { useState, useEffect } from "react"
import PaginationComponent from "../components/Pagination"
import TableUser from "../components/UsersTable"
import HeadContent from "../components/Header"
import axios from "../config/axiosInstance"
import { connect, useDispatch } from "react-redux"
import { socket } from "../config/axiosInstance"
import Layout from "../components/Layout"

const AllUsers = ({ users }) => {
    const [placeholder, setPlaceholder] = useState(true)
  const dispatch = useDispatch()

  const handleUserUpdated = (user, type) => {
    if (type === "New") {
      // post new user logic here
      socket.emit("addNew", user)
    } else {
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
    setLoading(true)
    axios
      .get("/users")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        return res.data
      })
      .then((result) => {
        setPlaceholder(false)
        dispatch(getUsers(result))
      })
      .catch((err) => {
        setPlaceholder(false)
        console.log(err)
      })
  }, [])

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

  return (
    <Layout title="All Records" icon="setting" description="Manage All Records">
      <TableUser
        onUserUpdated={handleUserUpdated}
        onUserDeleted={handleUserDeleted}
        placeholder={placeholder}
      />
      { users && users.length > 0 && <PaginationComponent />}
    </Layout>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps)(AllUsers)
