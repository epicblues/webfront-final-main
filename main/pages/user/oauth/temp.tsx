import { useRouter } from 'next/router'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { BACKGROUND_COLOR, MIDDLE_COLOR } from '../../../constants';
import AppIcon from '../../../public/static/logos/logo04.png'
import Image from 'next/dist/client/image';
const Temp = () => {
  const router = useRouter();
  const [rotate, setRotate] = useState(false);
  useEffect(() => {
    setRotate(true);
    setTimeout(() => {
      router.push("/")
    })
  })
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "70vh", background: BACKGROUND_COLOR, justifyContent: "center", alignItems: "stretch" }}>
      <div style={{ alignSelf: "center", transition: "all 2s", transform: rotate ? "rotate(359deg)" : undefined }} >
        <Image src={AppIcon} alt="메인 아이콘" width='250px' height="250px" />
      </div>

    </div>
  )
}

export default Temp
