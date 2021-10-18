import React from 'react'
import Head from 'next/head'

// Good For Search Engine Optimization
const Meta = ({ title, keywords, description }) => {
  return (
    <Head>


      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>

    </Head>
  )
}

Meta.defaultProps = {
  title: "WebDev News",
  keywords: "web development, programming",
  description: "get the latest news in webdev"
}
export default Meta
