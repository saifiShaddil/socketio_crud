import React, { useState } from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"
import axios from "../config/axiosInstance"

function DeleteModal(props) {
  const [open, setOpen] = useState(false)
  const id = props.user._id

  const handleDelete = () => {
    axios.delete("/users/" + id)
      .then((res) => {
        if(res.status !== 200){
         throw new Error(res.statusText)
        }
        return res.data
      })
      .then((result) => {
        props.onUserDeleted(id)
        setOpen(false)
      })
      .catch((err) => console.log(err))
   
  }
  return (
    <Modal
      closeIcon
      dimmer='blurring'
      size="small"
      open={open}
      trigger={<Button color={props.buttonColor}>{props.buttonTriggerTitle}</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" size="medium" content="Removing the User Record" />
      <Modal.Content>
        <Header size='small'>
          Are You sure you want to Removing this User?
        </Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={handleDelete}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal
