
import { GetServerSidePropsContext, NextPage } from 'next'

import Food from '../components/Sample'
import styles from '../styles/Home.module.css'
import clientPromise from '../util/mongodb'

const Home: NextPage<any> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>hello world</h1>
        <p>This is Recipe Page</p>
      </div>
    </div>
  )
}






export default Home
