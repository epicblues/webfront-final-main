import { useRouter } from 'next/dist/client/router'
import React, { FunctionComponent } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'



const Layout: FunctionComponent<{ pageProps: any }> = ({ children, pageProps }) => {
  const router = useRouter()
  const clickHandler = async () => {
    const res = await fetch('/api/user/logout');
    if (res.status === 200) {
      router.push('/user/login')
    }
  }
  return (
    // 모든 페이지에 적용될 레이아웃 디자인 (Header Or Footer)
    <div>
      <Container textAlign="center">
        {pageProps.email
          ?
          <button className="ui button facebook" onClick={clickHandler}>Logout</button>
          :
          <h1>요건 다 내꺼</h1>}
        <hr />
      </Container>
      <Container textAlign="center">
        {children}
      </Container>
      <footer>footer page</footer>
    </div>
  )
}

export default Layout
