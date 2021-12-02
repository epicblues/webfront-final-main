import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

// CSS
import cardsSwiperStyles from "../../../styles/recipe/CardsSwiper.module.css";

// ICON
import ci from "../../../public/static/logos/icon_check.png";
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

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const swiperParams = {
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    onbeforeprint: (swiper) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      swiper.activeIndex = mainImageIndex;
      swiper.navigation.update();
    },
    // allowTouchMove: false,
    speed: 200,
    slidesPerView: 1.3,
    centeredSlides: true,
    loop: true,
    preventInteractionOnTransition: true,
    spaceBetween: 30,
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  };

  return (
    <Swiper
      {...swiperParams}
      ref={setSwiper}
      className={cardsSwiperStyles.container}
    >
      <div className={cardsSwiperStyles.nvWrapper}>
        <div className={cardsSwiperStyles.btnWrapper} ref={navigationPrevRef}>
          <div className={cardsSwiperStyles.btnPrev}></div>
        </div>
        <div className={cardsSwiperStyles.btnWrapper} ref={navigationNextRef}>
          <div className={cardsSwiperStyles.btnNext}></div>
        </div>
      </div>
      {filteredHitRecipes.map((card, index) => {
        return (
          <SwiperSlide key={card._id} className={cardsSwiperStyles.card}>
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
            <div className={cardsSwiperStyles.cardBodyWrapper}>
              {/* 카드 바디 헤더 */}
              <div className={cardsSwiperStyles.cardBodyHeader}>
                <div className={cardsSwiperStyles.hot}>
                  <div className={cardsSwiperStyles.iWrapper}>
                    <Image objectFit="fill" objectFit="contain" src={ci} />
                  </div>
                  <strong>요즘 뜨는 레시피</strong>
                </div>
                <h1 className={cardsSwiperStyles.h1}>{card.title}</h1>
                <p className={cardsSwiperStyles.cardBodyAuthor}>
                  <strong>작성자</strong> | {card.author[0].name}
                </p>
                <div className={cardsSwiperStyles.cardBodyCategory}>
                  <p>#{renderSwitchCategory(card.category)}</p>
                </div>
              </div>

              {/* 카드 바디 본문 */}
              <div className={cardsSwiperStyles.cardBodyMain}>
                <Link
                  href={{
                    pathname: `/recipe/card/${card._id}`,
                  }}
                  as={`/recipe/card/${card._id}`}
                  passHref
                >
                  <a>
                    <p className={cardsSwiperStyles.cardBodyDesc}>
                      {card.desc}
                    </p>
                  </a>
                </Link>
              </div>
              {/* 카드 바디 푸터 */}
              <div className={cardsSwiperStyles.cardBodyFooter}>
                <div className={cardsSwiperStyles.hr}></div>
                <div className={cardsSwiperStyles.textWrapper}>
                  <span>
                    <FontAwesomeIcon
                      className={cardsSwiperStyles.cardIconHit}
                      icon={faEye}
                    />
                    조회{" "}
                    <strong className={cardsSwiperStyles.hitSpan}>
                      {card.hit}
                    </strong>
                    회
                  </span>
                  <span className={cardsSwiperStyles.cardUploadDate}>
                    {card.upload_date.slice(0, -14)}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardsSwiper;
