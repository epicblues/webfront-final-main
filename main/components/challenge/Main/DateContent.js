import React from "react";
import Link from "next/dist/client/link";
import MainStyle from "../../../styles/challenge/Main.module.css";
const DateContent = ({ challenges }) => {
  return (
    <Link passHref href={"/challenge/list/" + challenges._id}>
      <ul className={MainStyle.ul}>
        <li className={MainStyle.title}>{challenges.title}</li>
        <li className={MainStyle.li}>
          시작일:
          {new Date(challenges.startDate).getMonth() +
            1 +
            "월" +
            new Date(challenges.startDate).getDate() +
            "일"}
        </li>
        <li className={MainStyle.li}>
          종료일:
          {new Date(challenges.endDate).getMonth() +
            1 +
            "월" +
            new Date(challenges.endDate).getDate() +
            "일"}
        </li>
        <li className={MainStyle.li}>
          남은 일수:
          {Math.ceil(
            (new Date(challenges.endDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )}
          일
        </li>
      </ul>
    </Link>
  );
};

export default DateContent;
