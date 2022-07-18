import React, { useState } from "react"
import { Pagination } from "semantic-ui-react"

const PaginationComponent = ({data}) => {
  const [paginationProps, setPaginationprops] = useState({
    activePage: 1,
    allPages: data?.length, // data is an array of users
  })
  const handleChange = (e, data) => {
    setPaginationprops({...paginationProps, activePage: data.activePage})
  }
  return (
    <Pagination 
      defaultActivePage={paginationProps.activePage}
      firstItem={null}
      lastItem={null}
      totalPages={paginationProps.allPages}
      activePage={paginationProps.activePage}
      onPageChange={(e, data) => handleChange(e, data)}
    />
  )
}

export default PaginationComponent
