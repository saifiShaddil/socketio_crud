import React from "react"
import { BallTriangle } from "react-loader-spinner"
import { connect } from "react-redux"
import { Table } from "semantic-ui-react"
import AddModal from "./AddModal"
import DeleteModal from "./DeleteModal"

const TableUser = (props) => {
  let users = props.users

  users = users.map((user, index) => (
    <Table.Row key={index}>
      <Table.Cell>{user.fullname}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.age}</Table.Cell>
      <Table.Cell>{user.gender}</Table.Cell>
      <Table.Cell>
        <AddModal
          headerTitle="Edit User"
          buttonTriggerTitle="Edit"
          buttonSubmitTitle="Save"
          buttonColor="blue"
          userID={user._id}
          onUserUpdated={props.onUserUpdated}
       
        />
        <DeleteModal
          headerTitle="Delete User"
          buttonTriggerTitle="Delete"
          buttonColor="black"
          user={user}
          onUserDeleted={props.onUserDeleted}
        />
      </Table.Cell>
    </Table.Row>
  ))
  // Make every new user appear on top of the list
  users = [...users].reverse()

  return (
    <>
    <div className="btn-container">
      <AddModal 
        headerTitle="Add User"
        buttonTriggerTitle="NEW USER"
        buttonSubmitTitle="ADD"
        buttonColor="blue"
        userID={props.user?._id}
        onUserUpdated={props.onUserUpdated}
        server={props.server}
        socket={props.socket}
        
      />
    </div>
       <Table singleLine>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Name</Table.HeaderCell>
           <Table.HeaderCell>Email</Table.HeaderCell>
           <Table.HeaderCell>Age</Table.HeaderCell>
           <Table.HeaderCell>Gender</Table.HeaderCell>
           <Table.HeaderCell>Actions</Table.HeaderCell>
         </Table.Row>
       </Table.Header>
       <Table.Body>
         {users}
       </Table.Body>
     </Table>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(TableUser)
