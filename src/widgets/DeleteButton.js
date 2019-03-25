import React from 'react'
import {DeleteWrapper, DelButton} from 'styles/Elements'

const DeleteButton = props => {
  return (
    <DeleteWrapper {...props}>
      <DelButton>&#10006;</DelButton>
    </DeleteWrapper>
  )
}

export default DeleteButton
