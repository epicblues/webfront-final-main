import React from 'react'

const ModalButton = ({ children, onClick }: { children?: any, onClick: Function }) => {
  return (
    <a onClick={() => { onClick() }} style={{
      color: "#333",
      fontSize: "1.2em",
      fontWeight: "bold",
      // border: "solid white",
      // borderWidth: "0px 1px",
      padding: "3px 15px",
    }
    }>
      {children}
    </a>
  )
}

export default ModalButton
