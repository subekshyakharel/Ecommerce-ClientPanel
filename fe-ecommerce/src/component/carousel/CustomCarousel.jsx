import Carousel from "react-bootstrap/Carousel";
import stylish from "../../assets/stylish.webp";
import hero1 from "../../assets/hero1.jpg"
import hero4 from "../../assets/hero4.jpg"
import hero3 from "../../assets/hero3.jpg"
import { Button } from "react-bootstrap";

const CustomCarousel = () => {
  return (
    <div className="mt-4" style={{ width: "100%", height: "60vh" }}>
      <Carousel>
        <Carousel.Item>
          <img
            src={hero4}
            alt="First slide"
            className="d-block w-100"
            style={{ height: "60vh", objectFit: "cover" }} 
          />
          <Carousel.Caption className="carousel-caption-bg rounded p-2">
            <Button variant="danger">Shop Now</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={hero3}
            alt="Second slide"
            className="d-block w-100"
            style={{ height: "60vh", objectFit: "cover" }}
          />
          <Carousel.Caption className="carousel-caption-bg rounded p-2">
           <Button variant="danger">Shop Now</Button>
           </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={hero1}
            alt="Third slide"
            className="d-block w-100"
            style={{ height: "60vh", objectFit: "cover" }}
          />
          <Carousel.Caption className="carousel-caption-bg rounded p-2">
            <Button variant="danger">Shop Now</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
