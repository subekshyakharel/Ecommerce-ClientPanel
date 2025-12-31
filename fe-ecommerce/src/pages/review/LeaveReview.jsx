import React from 'react'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../component/customInput/CustomInput'
import useForm from "../../hooks/useForm.js"
import { postNewReviewApi } from '../../features/review/reviewApi.js'

const reviewInput=[
    {
        label:"Title",
        placeholder:"Enter review title",
        name:"title",
        type:"text"
    },
    {
        label:"Review Message",
        placeholder:"Leave review message",
        name:"reviewMessage",
        type:"text"
        
    },
    {
        label:"Rating",
        name:"rating",
        min:1,
        max:5,
        type:"number"
    }
]

const initialState={};
const LeaveReview = ({orderData}) => {
    const {form, setForm, handleOnChange} = useForm(initialState)

    const handleOnSubmit=async(e)=>{
        e.preventDefault()
        const obj= {
            ...form, 
            productId: orderData.productId,
            orderId: orderData._id
        }
       const result= await postNewReviewApi(obj);
       console.log(result)
    }
  return (
    <div className='p-2'>
        <Form onSubmit={handleOnSubmit}>
            {reviewInput.map((input, i)=><CustomInput onChange={handleOnChange} key={input.name} {...input}/> )}
            <div className="d-grid">
                 <Button type='submit' variant='dark'>Leave Review</Button>
            </div>
           
        </Form>
    </div>
  )
}

export default LeaveReview