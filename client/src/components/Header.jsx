import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeadContent = ({title, description, icon}) => (
  <Header as='h2'>
    <Icon name={icon} />
    <Header.Content>
      {title}
      <Header.Subheader>{description}</Header.Subheader>
    </Header.Content>
  </Header>
)

export default HeadContent