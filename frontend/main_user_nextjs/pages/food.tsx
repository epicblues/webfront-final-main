import { MongoClient } from 'mongodb'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import React, { FunctionComponent } from 'react'
import { env } from '../mongo.config'


const food: FunctionComponent<any> = ({ foodDatas }: { foodDatas: [any] }) => {

  return (
    <div>
      {foodDatas.map(value =>
        <div>식품명 : {value.식품명}</div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const client: MongoClient = new MongoClient(env.MONGO_URL);
  await client.connect();
  const db = client.db("webfront");
  const foodDatas = await db.collection("food").find({}).project({ _id: 0 }).limit(5).toArray();
  console.log(foodDatas)

  const result: GetServerSidePropsResult<any> = {
    props: {
      foodDatas
    }
  }
  return result
}

export default food
