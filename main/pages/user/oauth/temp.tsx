import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/main/Loading';
const Temp = () => {
  const router = useRouter();
  const [rotate, setRotate] = useState(false);
  useEffect(() => {
    setRotate(true);
    setTimeout(() => {
      router.push("/")
    })
  }, [router])
  return (
    <Loading />
  )
}

export default Temp
