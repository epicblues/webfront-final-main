
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import clientPromise from '../util/mongodb'

const Home: NextPage<any> = ({ foodData }) => {
  return (
    <div className={styles.container}>
      식품명 : {foodData['식품명']}
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
