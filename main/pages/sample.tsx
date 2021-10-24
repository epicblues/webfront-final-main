
import { GetServerSidePropsContext, NextPage } from 'next'

import Food from '../components/Sample'
import styles from '../styles/Home.module.css'
import clientPromise from '../util/mongodb'

const Home: NextPage<any> = ({ foodData }) => {
  return (
    <div className={styles.container}>
      <Food food={foodData} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const client = await clientPromise
  const db = client.db('webfront');

  const foodData = await db.collection('food').findOne({})

  if (foodData) {
    delete foodData._id;
  }
  return {
    props: { foodData },
  }


}



export default Home
