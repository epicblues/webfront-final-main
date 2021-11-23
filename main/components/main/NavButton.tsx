import React from 'react'

const MiniButton = ({ children, href }: { children: string, href: string }) => {
  return (
    <a href={href} style={{
      color: "white",
      alignSelf: "center",
      fontSize: "1.2em",
      fontWeight: "bolder",
      // border: "solid white",
      borderWidth: "0px 1px",
      padding: "3px 15px"
    }
    }>
      {children}
    </a>
  )
}

export default MiniButton
