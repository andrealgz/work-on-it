import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function HomeScreen() {
  return (
    <>
      <Carousel 
          className="home-screen-carousel"
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
          <img src="https://www.adra360.com/wp-content/uploads/2020/07/reparaciones-hogar-adra360.jpg" alt="img1"/>
          <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img2"/>
          <img src="https://www.adra360.com/wp-content/uploads/2020/07/reparaciones-hogar-adra360.jpg" alt="img1"/>
          <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="img2"/>
      </Carousel>
    </>
  )
}

export default HomeScreen;
