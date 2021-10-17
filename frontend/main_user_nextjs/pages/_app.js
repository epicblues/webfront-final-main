import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <h1>Hello world Top Layout</h1>
      <Component {...pageProps}></Component>
    </div>
  );
}

export default MyApp;
