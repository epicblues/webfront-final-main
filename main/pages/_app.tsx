import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Layout pageProps={{ ...pageProps }}>
      <Component {...pageProps} />
    </Layout>
  )

}
export default MyApp
