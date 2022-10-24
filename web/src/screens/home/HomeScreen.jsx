import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./HomeScreen.css";

function HomeScreen() {
  return (
    <>
      <Carousel 
          className="home-screen-carousel h-100"
          interval={7500}
          autoPlay={true}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          stopOnHover={false}
          axis='vertical'
        >
          <img className="home-screen-carousel-image h-100" src="https://res.cloudinary.com/dc7llr1ic/image/upload/v1666445737/work-on-it/home_psavsr.png" alt="Home_IMG_carousel" />
          <img className="home-screen-carousel-image h-100" src="https://res.cloudinary.com/dc7llr1ic/image/upload/v1666445737/work-on-it/home2_rwhhvi.png" alt="Home_IMG_carousel" />
          <img className="home-screen-carousel-image h-100" src="https://res.cloudinary.com/dc7llr1ic/image/upload/v1666445741/work-on-it/home3_bfxveo.png" alt="Home_IMG_carousel" />
      </Carousel>
    </>
  )
}

export default HomeScreen;