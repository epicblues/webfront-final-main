import React, { FunctionComponent } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'



const Layout: FunctionComponent<{ pageProps: any }> = ({ children, pageProps }) => {

  const clickHandler = async () => {

    const res = await fetch('/api/user/logout');
    if (res.status === 200) {
      location.href = "/"
    }
  }
  return (
    <div>

      <Container textAlign="center">
        {pageProps.email
          ?
          <button className="ui button facebook" onClick={clickHandler}>Logout</button>
          :
          <h1>요건 다 내꺼</h1>}

        <hr />
      </Container>
      {children}
    </div>
  )
}

export default Layout
