import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaShoppingBag } from "react-icons/fa";

const CustomCard = ({img, title, price})=> {
  return (
    <Card className='cardStyle' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} style={{ height: "280px", objectFit: "cover" }}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className='d-flex justify-content-between mt-4'>
        <Card.Text className='fs-bold'>
         Rs.{price} 
        </Card.Text>
        <Card.Text>
        <FaShoppingBag size={30} />
        </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;