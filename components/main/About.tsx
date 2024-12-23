import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <>
      <div><h2 className="text-Es_primary text-4xl font-bold text-center mb-14">A propos</h2></div>
      <div className='flex justify-center items-center'>
          <div>
            <p className='text-xl'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos voluptates quasi 
              repellat <br /> a est officia officiis doloremque aliquam. Esse illum nam 
              accusamus voluptate beatae, dolorum natus id est dolorem <br /> 
              asperiores optio quis voluptas sapiente rerum, excepturi eveniet! Id, 
              voluptatum. At unde sed quasi provident explicabo <br />. Voluptatum 
              repellendus vero, harum quos cupiditate, sapiente eius doloribus 
              maxime quae amet <br /> praesentium perspiciatis odio. Saepe, dolor inve <br />
              ntore. Accusantium eius quisquam omnis cupiditate incidunt recusandae.
            </p> 
          </div>
          <div>
              <Image src="/img1.jpg" alt="a propos de l'ESSI " height={400} width={400}/>
          </div> 
      </div>
    </>
  )
}

export default About
