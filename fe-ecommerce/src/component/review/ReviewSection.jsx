import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleProductReviewAction } from '../../features/review/reviewAction'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from 'react-bootstrap';
import DisplayReview from './DisplayReview';

const ReviewSection = ({id}) => {
    // const {id} = useParams()
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getSingleProductReviewAction(id))
    }, [dispatch, id])
  return (
    <div>
        <Container>
         <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="details" title="Details">
        Other details will be displayed here
      </Tab>
      <Tab eventKey="review" title="Reviews">
        <DisplayReview/>
      </Tab>
    </Tabs>
    </Container>
    </div>
  )
}

export default ReviewSection