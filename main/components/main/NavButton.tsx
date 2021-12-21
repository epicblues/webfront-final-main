import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'

const MiniButton = ({ children, href, onClick }: { children: any, href: string, onClick: Function }) => {
  const router = useRouter();
  console.log(router.asPath);
  const pathName = router.asPath.split('/')[1]; // recipe diary challenge
  console.log(pathName)

  return (
    <Link href={href} passHref><a style={{
      color: pathName === href.substring(1) ? "#ff9393" : "#333",
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
