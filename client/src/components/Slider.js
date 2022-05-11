import React from "react";

//Owl Carousel Libraries and Module
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Owl Carousel Settings
const options = {
  loop: true,
  margin: 0,
  responsiveClass: true,
  autoplay: true,
  autoplayTimeout: 5000,
  navText: [
    "<img src='img/left-arrow1.png'>",
    "<img src='img/right-arrow1.png'>",
  ],
  responsive: {
    0: {
      items: 1,
      nav: false,
      loop: true,
    },

    600: {
      items: 1,
      nav: false,
      loop: true,
    },

    1000: {
      items: 1,
      nav: true,
      dots: false,
      loop: true,
      margin: 0,
    },
  },
};
const Slider = () => {
  return (
    <div class="container step_5">
      <div class="row" id="bannerCarousel">
        <OwlCarousel className="owl-theme" {...options}>
          <div class="item">
            <div class="how-wrks">
              <img src="https://www.mjvaluemart.com/pub/media/magiccart/magicslider/mobile/i/m/image-1-min.png" alt="" />
            </div>
          </div>
          <div class="item">
            <div class="how-wrks">
              <img src="img/pic9.png" alt="" />
            </div>
          </div>
          <div class="item">
            <div class="how-wrks">
              <img src="img/pic9.png" alt="" />
            </div>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};
export default Slider;