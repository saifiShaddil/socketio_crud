import React from "react"
import { Container, Header, Icon } from "semantic-ui-react"

const Layout = ({ children , icon, title, description}) => {

  return (
    <Container>
      <Header as="h2">
        <Icon name={icon} />
        <Header.Content>
          {title}
          <Header.Subheader>{description}</Header.Subheader>
        </Header.Content>
      </Header>
      {children}
    </Container>
  )
}

export default Layout
