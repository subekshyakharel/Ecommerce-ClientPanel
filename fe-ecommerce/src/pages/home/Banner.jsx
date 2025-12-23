import React from 'react'
import { Button, Container } from 'react-bootstrap'
import bannerImage from "../../assets/banner.jpg"

const Banner = () => {
  return (
    <>
    <div className='banner mb-4'>
        <Container className='d-flex gap-5'>
            <div className='p-2'>
                <img src={bannerImage} height={400} alt="" />
            </div>
            <div className='pt-4'>
                <h3>
                    Refresh Your Wardrobe
                </h3>
                <p className='pt-5'>Step into the season’s hottest trends and give your wardrobe a fresh start. From comfy casuals to bold statement pieces, we’ve got everything you need to make every outfit Instagram-worthy.</p>
                <div className='mt-5'>
                    <Button variant='dark'>Shop Now</Button>
                </div>
            </div>
        </Container>
    </div>
    </>
  )
}

export default Banner