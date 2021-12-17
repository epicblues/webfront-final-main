import React, { useRef } from "react";

// CSS
import "swiper/components/navigation/navigation.min.css";
import swiperNavigationStyles from "../../../styles/recipe/SwiperNavation.module.css";

const SwiperNavigation = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const swiperParams = {
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    // IE, Edge, Firefox(>5) 이벤트 처리용 핸들러
    onBeforePrint: (swiper) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      swiper.activeIndex = mainImageIndex;
      swiper.navigation.update();
    },
    allowTouchMove: true,
    speed: 400,
    slidesPerView: 1.3,
    centeredSlides: true,
    loop: true,
    preventInteractionOnTransition: true,
    spaceBetween: 30,
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainImageIndex(e.activeIndex),
  };
  return (
    <div className={swiperNavigationStyles.nvWrapper}>
      <div
        className={swiperNavigationStyles.btnWrapper}
        ref={navigationPrevRef}
      >
        <div className={swiperNavigationStyles.btnPrev}></div>
      </div>
      <div
        className={swiperNavigationStyles.btnWrapper}
        ref={navigationNextRef}
      >
        <div className={swiperNavigationStyles.btnNext}></div>
      </div>
    </div>
  );
};

export default SwiperNavigation;
