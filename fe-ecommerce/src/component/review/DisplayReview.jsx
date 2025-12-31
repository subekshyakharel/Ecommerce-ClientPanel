import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./review.css";

const DisplayReview = () => {
  const { productReview } = useSelector((state) => state.reviewInfo);

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    const first = parts?.[0]?.[0]?.toUpperCase() || "";
    const second = parts?.[1]?.[0]?.toUpperCase() || "";
    return first + second;
  };

  const renderStars = (rating) => {
    return (
      <span className="stars">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    );
  };

  return (
    <div className="review-wrapper">
      {productReview?.length ? (
        productReview.map((review, i) => (
          <Row className="review-card shadow-sm" key={i}>
            <Col>
              <div className="review-content">
                {/* Avatar */}
                <div className="review-profile">
                  {getInitials(review.userName)}
                </div>

                {/* Review body */}
                <div className="review-body">
                  <div className="review-header">
                    <h5>{review.userName}</h5>
                    <span className="review-date">
                      {review.createdAt.slice(0, 10)}
                    </span>
                  </div>

                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>

                  <p className="review-message">
                    {review.reviewMessage}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <p className="text-muted text-center">No reviews yet</p>
      )}
    </div>
  );
};

export default DisplayReview;
