import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// CSS
import cardsSwiperStyles from "../../../styles/recipe/CardsSwiper.module.css";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const CardsSwiper = ({ filteredHitRecipes }) => {
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function renderSwitchCategory(param) {
    switch (param) {
      case "soup":
        return "국/탕/찌개";
      case "grill":
        return "구이";
      case "noodle":
        return "면/파스타";
      case "rice":
        return "밥/볶음밥";
      case "side":
        return "반찬";
      case "kimchi":
        return "김치";
      case "dessert":
        return "디저트";
      case "etc":
        return "기타";
      default:
        return "몰라용";
    }
  }
  const swiperParams = {
    slidesPerView: 1.3,
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  };

  return (
    <Swiper
      {...swiperParams}
      ref={setSwiper}
      className={cardsSwiperStyles.container}
    >
      {filteredHitRecipes.map((card, index) => {
        return (
          <SwiperSlide key={card._id} className={cardsSwiperStyles.card}>
            <Link
              href={{
                pathname: `/recipe/card/${card._id}`,
              }}
              as={`/recipe/card/${card._id}`}
              passHref
            >
              <a>
                {/* 카드 헤더 (이미지) */}
                <div className={cardsSwiperStyles.cardHeader}>
                  <Image
                    className={cardsSwiperStyles.cardHeaderImage}
                    src={
                      process.env.NEXT_PUBLIC_STATIC_SERVER_URL +
                      card.steps.slice(-1)[0].image_url
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    alt="thumbnail image"
                  />
                </div>
                {/* 카드 바디 */}
                <div className={cardsSwiperStyles.cardBodyMain}>
                  {/* 카드 바디 헤더 */}
                  <div className={cardsSwiperStyles.cardBodyHeader}>
                    <div className={cardsSwiperStyles.hot}>
                      /요즘 뜨는 레시피/
                    </div>
                    <h1 className={cardsSwiperStyles.h1}>{card.title}</h1>
                    <p className={cardsSwiperStyles.cardBodyCategory}>
                      #{renderSwitchCategory(card.category)}
                    </p>
                    <p className={cardsSwiperStyles.cardBodyAuthor}>
                      작성자: {card.author[0].name}
                    </p>
                  </div>

                  {/* 카드 바디 본문 */}
                  <div className={cardsSwiperStyles.cardBodyMain}>
                    <p className={cardsSwiperStyles.cardBodyDesc}>
                      {card.desc}
                    </p>
                  </div>

                  {/* 카드 바디 푸터 */}
                  <div className={cardsSwiperStyles.cardBodyFooter}>
                    <hr className={cardsSwiperStyles.hr} />
                    <FontAwesomeIcon
                      className={cardsSwiperStyles.cardIconHit}
                      icon={faEye}
                    />
                    <span>조회 {card.hit}회</span>
                    <span className={cardsSwiperStyles.cardUploadDate}>
                      {card.upload_date.slice(0, -14)}
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardsSwiper;
