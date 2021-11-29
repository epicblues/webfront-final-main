import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper";

// CSS
import recipeListStyles from "../../../styles/RecipeList.module.css";

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

  SwiperCore.use([Navigation]);

  const swiperParams = {
    navigation: true,
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  };

  return (
    <Swiper
      {...swiperParams}
      ref={setSwiper}
      className={recipeListStyles.cards}
    >
      {filteredHitRecipes.map((card, index) => {
        return (
          <SwiperSlide key={index} className={recipeListStyles.card}>
            <Link
              href={{
                pathname: `/recipe/card/${card._id}`,
              }}
              as={`/recipe/card/${card._id}`}
              passHref
            >
              <a>
                {/* 카드 헤더 (이미지) */}
                <div className={recipeListStyles.cardHeader}>
                  <Image
                    className={recipeListStyles.cardHeaderImage}
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
                <div className={recipeListStyles.cardBodyMain}>
                  {/* 카드 바디 헤더 */}
                  <div className={recipeListStyles.cardBodyHeader}>
                    <h1 className={recipeListStyles.h1}>{card.title}</h1>
                    <p className={recipeListStyles.cardBodyCategory}>
                      #{renderSwitchCategory(card.category)}
                    </p>
                    <p className={recipeListStyles.cardBodyAuthor}>
                      작성자: {card.author[0].name}
                    </p>
                  </div>

                  {/* 카드 바디 본문 */}
                  <div className={recipeListStyles.cardBodyMain}>
                    <p className={recipeListStyles.cardBodyDesc}>{card.desc}</p>
                  </div>

                  {/* 카드 바디 푸터 */}
                  <div className={recipeListStyles.cardBodyFooter}>
                    <hr className={recipeListStyles.hr} />
                    <FontAwesomeIcon
                      className={recipeListStyles.cardIconHit}
                      icon={faEye}
                    />
                    <span>조회 {card.hit}회</span>
                    <span className={recipeListStyles.cardUploadDate}>
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
