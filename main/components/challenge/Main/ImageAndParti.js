import React from "react";

//css
import MainStyles from "../../../styles/challenge/Main.module.css";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { faUser } from "react-icons/fa";
const ImageAndParti = ({ challenges }) => {
  return (
    <>
      <div className={MainStyles.imageWrap}>
        <div className={MainStyles.imagePart}>
          <faUser size="20" color="black" />
          {challenges.participants.length}명
        </div>
        <Link passHref href={"/challenge/list/" + challenges._id}>
          <div>
            <Image
              style={{
                zIndex: "0",
                borderRadius: "5%",
                width: "250px",
              }}
              src={process.env.NEXT_PUBLIC_STATIC_SERVER_URL + challenges.image}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ImageAndParti;
