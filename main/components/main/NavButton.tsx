import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'

const MiniButton = ({ children, href, onClick }: { children: any, href: string, onClick: Function }) => {
  const router = useRouter();
  const pathName = router.asPath.split('/')[1]; // recipe diary challenge

  return (
    <Link href={href} passHref><a style={{
      color: pathName === href.substring(1) ? "#ff5656" : "#333",
      alignSelf: "center",
      fontSize: "1.2em",
      fontWeight: "bolder",
    }
    } onClick={() => { onClick() }}>
      {children}
    </a></Link>

  )
}

export default MiniButton
