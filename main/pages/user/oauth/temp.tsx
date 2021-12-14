import { useRouter } from 'next/router'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { BACKGROUND_COLOR, MIDDLE_COLOR } from '../../../constants';
import AppIcon from '../../../public/static/logos/logo04.png'
import Image from 'next/dist/client/image';
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
