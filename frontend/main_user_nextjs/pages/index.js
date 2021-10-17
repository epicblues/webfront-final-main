import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// 모듈에 있는 css를 적용하려면 class에 해당 css 클래스를 .연산자로 접근해야한다.

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <h1>Main Page</h1>
    </div>
  );
}
