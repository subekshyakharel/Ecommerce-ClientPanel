import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomCarousel from "../../component/carousel/CustomCarousel";
import CategorySection from "../category/CategorySection";
import LatestArrival from "./LatestArrival";
import { useDispatch } from "react-redux";
import { fetchParentCategoriesAction } from "../../features/category/categoryAction";
import TopSelling from "./TopSelling";
import Banner from "./Banner";
import SwiperCategory from "../../component/swiperCategory/SwiperCategory";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParentCategoriesAction());
  }, [dispatch]);

  return (
    <div>
      <Container className="">
        <Row>
          <Col>
            {/* hero section  */}
            <CustomCarousel />

            {/* category section  */}
            {/* <CategorySection /> */}
            <SwiperCategory/>

            {/* latest Arrival  */}
            <LatestArrival />

            {/* top selling  */}
            <TopSelling />
          </Col>
        </Row>
      </Container>

      {/* banner */}
      <Banner />
    </div>
  );
};

export default Home;
