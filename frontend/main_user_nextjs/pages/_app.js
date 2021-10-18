import "../styles/globals.css";
import Layout from "../components/Layout";
import { getStaticProps } from ".";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
  );
}

export default MyApp;
