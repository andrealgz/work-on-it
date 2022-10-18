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
          <div className="home-img img1 h-100"></div>
          <div className="home-img img2 h-100"></div>
          <div className="home-img img3 h-100"></div>
      </Carousel>
    </>
  )
}

export default HomeScreen;