import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/dist/client/image";

// swiper
import { Swiper, SwiperSlide, user } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

// LikeButton
import LikeButton from "../../recipe/LikeButton";
import DislikeButton from "../../recipe/DislikeButton";

// CSS
import cardsSwiperStyles from "../../../styles/recipe/CardsSwiper.module.css";

// ICON
import ci from "../../../public/static/logos/icon_check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { UserBmr } from "../../../models";

const CardsSwiper = ({ filteredHitRecipesProps, user }) => {
  const [swiper, setSwiper] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [filteredHitRecipes, setFilteredHitRecipes] = useState(
    filteredHitRecipesProps
  );
  const [isDetailActive, setIsDetailActive] = useState(false);
  const [activatedDetailIndex, setActivatedDetailIndex] = useState(null);
  const handleDetailBtnClick = (booleanVal, index) => {
    setIsDetailActive(booleanVal);
    setActivatedDetailIndex(index);
  };
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
    speed: 400,
    slidesPerView: 1.3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  };

  useEffect(() => {
    setIsDetailActive(false);
  }, [mainImageIndex]);

  return (
    <Swiper
      {...swiperParams}
      ref={setSwiper}
      className={cardsSwiperStyles.container}
    >
      {filteredHitRecipes.map((card, index) => {
        return (
          <SwiperSlide
            key={card._id}
            className={
              isDetailActive && activatedDetailIndex === index
                ? cardsSwiperStyles.cardClick
                : cardsSwiperStyles.card
            }
          >
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
              <div className={cardsSwiperStyles.like}>
                {card.likes.includes(user.id) === true ? (
                  <DislikeButton
                    filterData={setFilteredHitRecipes}
                    index={index}
                    token={user.token}
                    recipeId={card._id}
                  />
                ) : (
                  <LikeButton
                    recipeId={card._id}
                    token={user.token}
                    filterData={setFilteredHitRecipes}
                    index={index}
                  />
                )}
              </div>
            </div>
            {/* 카드 바디 */}
            <div className={cardsSwiperStyles.cardBodyWrapper}>
              {/* 카드 바디 헤더 */}
              <div className={cardsSwiperStyles.cardBodyHeader}>
                <div className={cardsSwiperStyles.headerFlex}>
                  <div className={cardsSwiperStyles.hot}>
                    <div className={cardsSwiperStyles.innerHotWrapper}>
                      <div className={cardsSwiperStyles.iWrapper}>
                        <Image
                          layout="intrinsic"
                          objectFit="contain"
                          src={ci}
                        />
                      </div>
                      <strong>요즘 뜨는 레시피!</strong>
                    </div>
                    <div className={cardsSwiperStyles.detailBtn}>
                      {isDetailActive && activatedDetailIndex === index ? (
                        <span
                          onClick={() => handleDetailBtnClick(false, index)}
                        >
                          접기<i className="caret up icon"></i>
                        </span>
                      ) : (
                        <span onClick={() => handleDetailBtnClick(true, index)}>
                          자세히보기<i className="caret down icon"></i>
                        </span>
                      )}
                    </div>
                  </div>
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
                <div className={cardsSwiperStyles.cardBodyDesc}>
                  <div className={cardsSwiperStyles.cardBodyMouse}></div>
                  {card.desc}
                </div>
              </div>
              {/* 카드 바디 푸터 */}
              <div className={cardsSwiperStyles.cardBodyFooter}>
                <div className={cardsSwiperStyles.hr}></div>
                <div className={cardsSwiperStyles.textWrapper}>
                  {isDetailActive && activatedDetailIndex === index ? (
                    <div className={cardsSwiperStyles.goRecipe}>
                      <Link
                        href={{
                          pathname: `/recipe/card/${card._id}`,
                        }}
                        as={`/recipe/card/${card._id}`}
                        passHref
                      >
                        <a>
                          <p>레시피 보러가기</p>
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
