import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// CSS
import hitListStyles from "../../../styles/recipe/HitList.module.css";

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
      className={hitListStyles.container}
    >
      {filteredHitRecipes.map((card, index) => {
        return (
          <SwiperSlide key={card._id} className={hitListStyles.card}>
            <Link
              href={{
                pathname: `/recipe/card/${card._id}`,
              }}
              as={`/recipe/card/${card._id}`}
              passHref
            >
              <a>
                {/* 카드 헤더 (이미지) */}
                <div className={hitListStyles.cardHeader}>
                  <Image
                    className={hitListStyles.cardHeaderImage}
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
                <div className={hitListStyles.cardBodyMain}>
                  {/* 카드 바디 헤더 */}
                  <div className={hitListStyles.cardBodyHeader}>
                    <div className={hitListStyles.hot}>/요즘 뜨는 레시피/</div>
                    <h1 className={hitListStyles.h1}>{card.title}</h1>
                    <p className={hitListStyles.cardBodyCategory}>
                      #{renderSwitchCategory(card.category)}
                    </p>
                    <p className={hitListStyles.cardBodyAuthor}>
                      작성자: {card.author[0].name}
                    </p>
                  </div>

                  {/* 카드 바디 본문 */}
                  <div className={hitListStyles.cardBodyMain}>
                    <p className={hitListStyles.cardBodyDesc}>{card.desc}</p>
                  </div>

                  {/* 카드 바디 푸터 */}
                  <div className={hitListStyles.cardBodyFooter}>
                    <hr className={hitListStyles.hr} />
                    <FontAwesomeIcon
                      className={hitListStyles.cardIconHit}
                      icon={faEye}
                    />
                    <span>조회 {card.hit}회</span>
                    <span className={hitListStyles.cardUploadDate}>
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
