import React, { useState, useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { Button, Form, Message, Select } from "semantic-ui-react"
import { updateUser, addUser } from "../store/actions"
import axios from "../config/axiosInstance"
import {validateEmail} from "../functions/validateEmail"

const AddForm = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    errorName: false,
    errorEmail: false,
    errorAge: false,
    errorGen: false,
  })

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
    if (fullname === "") {
      setError({ ...error, errorName: "Name is required" })
      return
    }

    if (email === "") {
      setError({ ...error, errorEmail: "Email is Required" })
      return
    }
    if (!validateEmail(email)) {
      setError({ ...error, errorEmail: "Enter a Valid Email address" })
      return
    }

    if (age === "") {
      setError({ ...error, errorAge: "Age is required" })
      return
    }
    if (gender === "") {
      setError({ ...error, errorGen: "Select the Field" })
      return
    }

    setLoading(true)

    if (method === "POST") {
      axios
        .post("/users/", body)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(res.statusText)
          }
          return res.data
        })
        .then((result) => {
          setLoading(false)
          props.onUserUpdated(result, "New")
          dispatch(addUser(result))
          props.setOpen(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
    if (method === "put") {
      axios
        .put("/users/" + props.userID, body)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(res.statusText)
          }
          return res.data
        })
        .then((result) => {
          setLoading(false)
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
    const { value, name } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "fullname") {
      if (value !== "") {
        setError({ ...error, errorName: false })
      }
    }
    if (name === "email") {
      if (value !== "") {
        setError({ ...error, errorEmail: false })
      }
    }
    if (name === "age") {
      if (value !== "") {
        setError({ ...error, errorAge: false })
      }
    }
    if (name === "gender") {
      if (value !== "") {
        setError({ ...error, errorGen: false })
      }
    }
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
      <Form.Field
        label="Full Name"
        control={Input}
        onChange={(e) => handleChange(e)}
        name="fullname"
        value={fullname}
        placeholder="Full Name"
        error={error.errorName}
      />
      <Form.Field
        id="email"
        control={Input}
        label="Email"
        name="email"
        onChange={(e) => handleChange(e)}
        value={formData.email}
        placeholder="joe@schmoe.com"
        error={error.errorEmail}
      />
      <Form.Field
        error={errorAge}
        type="number"
        min="5"
        max="120"
        label="Age"
        control={Input}
        onChange={(e) => handleChange(e)}
        name="age"
        value={age}
        placeholder="18"
      />
      <Select
        error={error.errorGen}
        label="Gender"
        name="gender"
        options={genderOptions}
        placeholder="Gender"
        value={gender}
        onChange={handleSelectChange}
      ></Select>
      <Button
        icon
        loading={loading}
        labelPosition="left"
        style={{ display: "block", marginTop: "1em" }}
        color={props.buttonColor}
      >
        <Icon name="save" />
        {props.buttonSubmitTitle}
      </Button>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}
export default connect(mapStateToProps)(AddForm)
