import Link from 'next/link'
import React from 'react'

const MiniButton = ({ children, href, onClick }: { children: any, href: string, onClick: Function }) => {
  return (
    <Link href={href} passHref><a style={{
      color: "#333",
      alignSelf: "center",
      fontSize: "1.2em",
      fontWeight: "bolder",
      // border: "solid white",
      // borderWidth: "0px 1px",
      // padding: "3px 15px"
    }
    } onClick={() => { onClick() }}>
      {children}
    </a></Link>

  )
}

export default MiniButton
