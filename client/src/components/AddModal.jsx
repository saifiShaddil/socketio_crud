import React, { useState } from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"
import AddForm from "./Form"

function AddModal(props) {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button color={props.buttonColor}>{props.buttonTriggerTitle}</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size='tiny'
    >
      <Header icon={props.buttonSubmitTitle === 'ADD' ? 'add' :'edit'} content={props.headerTitle} />
      <Modal.Content>
       <AddForm 
          buttonSubmitTitle={props.buttonSubmitTitle}
          buttonColor={props.buttonColor}
          userID={props.userID}
          onUserAdded={props.onUserAdded}
          onUserUpdated={props.onUserUpdated}
          setOpen={setOpen}
       />
      </Modal.Content>
    </Modal>
  )
}

export default AddModal
