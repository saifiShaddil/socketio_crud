import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeadContent = () => (
  <Header as='h2'>
    <Icon name='settings' />
    <Header.Content>
      Account Settings
      <Header.Subheader>Manage Records</Header.Subheader>
    </Header.Content>
  </Header>
)

export default HeadContent