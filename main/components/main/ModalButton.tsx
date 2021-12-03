import React from 'react'

const ModalButton = ({ children, onClick }: { children?: any, onClick: Function }) => {
  return (
    <a onClick={() => { onClick() }} style={{
      margin: '0 auto',
    }
    }>
      {children}
    </a>
  )
}

export default ModalButton
