import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import Head from 'next/head'
import { useLoading } from '../hooks'



function MyApp({ Component, pageProps }: AppProps) {
  const loadingElement = useLoading(pageProps);
  const loadedPageProps = { ...pageProps, loadingProps: loadingElement };

  return (
    <Layout pageProps={{ ...loadedPageProps }}>
      <Head>
        <title>요건 다 내꺼!</title>
        <link rel="shortcut icon" href='/static/logos/favicon.ico'></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Component {...loadedPageProps} />
    </Layout>
  )

}
export default MyApp
