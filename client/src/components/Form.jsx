import React, { useState, useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { Button, Form, Message, Select } from "semantic-ui-react"
import { updateUser, addUser } from "../store/actions"
import axios from "../config/axiosInstance"


const AddForm = (props) => {
  const dispatch = useDispatch()

  const genderOptions = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
    { key: "o", text: "Do Not Disclose", value: "Do Not Disclose" },
  ]

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    gender: "",
  })
  const method = props.userID ? "put" : "POST"

  const { fullname, email, age, gender } = formData
  const hanleSubmit = (e) => {
    e.preventDefault()
    const body = JSON.stringify({fullname, email, age, gender})
    if (fullname === "") return
    if (email === "") return
    if (age === "") return
    if (gender === "") return

    if (method === "POST") {
      axios.post("/users/", body)
      .then((res) => {
          if(res.status !== 200){
            throw new Error(res.statusText)
          }
          return res.data
        })
        .then((result) => {
          props.onUserUpdated(result, "New")
          dispatch(addUser(result))
          props.setOpen(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (method === "put") {
      axios.put("/users/" + props.userID, body)
        .then((res) => {
          if(res.status !== 200){
           throw new Error(res.statusText)
          }
          return res.data
        })
        .then((result) => {
          props.onUserUpdated(result, "Update")
          dispatch(updateUser(result))
          props.setOpen(false)
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSelectChange = (e, data) => {
    setFormData({ ...formData, gender: data.value })
  }

  useEffect(() => {
    if (props.userID) {
      let tobeUpdated = props.users.filter((user) => user._id === props.userID)

      if (tobeUpdated.length > 0) {
        setFormData({
          fullname: tobeUpdated[0].fullname,
          email: tobeUpdated[0].email,
          age: tobeUpdated[0].age ?? "",
          gender: tobeUpdated[0].gender,
        })
      }
    }
  }, [])
  return (
    <Form success onSubmit={(e) => hanleSubmit(e)}>
      <Form.Field>
        <label>Full Name</label>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          name="fullname"
          value={fullname}
          placeholder="Full Name"
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          value={email}
          placeholder="joe@schmoe.com"
        />
      </Form.Field>
      <Form.Field>
        <label>Age</label>
        <input
          type="number"
          min="5"
          max="120"
          onChange={(e) => handleChange(e)}
          name="age"
          value={age}
          placeholder="18"
        />
      </Form.Field>
      <Select
        label="Gender"
        options={genderOptions}
        placeholder="Gender"
        value={gender}
        onChange={handleSelectChange}
      ></Select>
      <Button style={{ display: "block", marginTop: '1em'}} color={props.buttonColor}>{props.buttonSubmitTitle}</Button>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}
export default connect(mapStateToProps)(AddForm)
