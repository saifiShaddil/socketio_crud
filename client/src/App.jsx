import { Container } from "semantic-ui-react"
import { Route, Routes, Navigate } from "react-router-dom"
import AllUsers from "./Pages/AllUsers"

function App() {
  return (
    <div style={{ margin: "2em auto" }}>
      <Container>
        <Routes>
          <Route exact path="/" element={<AllUsers />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
