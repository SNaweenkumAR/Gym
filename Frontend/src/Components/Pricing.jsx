import React from 'react'
import {Check} from 'lucide-react'
import {Link} from 'react-router-dom'

export const Pricing = () => {
  
  const pricing = [
     {
      imgUrl:"./pricing.jpg",
      title:"QUARTERLY",
      price:"18000",
      length:3
     },
     {
      imgUrl:"./pricing.jpg",
      title:"HALF-YEARLY",
      price:"30000",
      length:6
     },
     {
      imgUrl:"./pricing.jpg",
      title:"YEARLY",
      price:"50000",
      length:12
     }
  ]

  return (
    <section className='pricing'>
      <h1>NK FITNESS PLANS</h1>
      <div className="wrapper">
        {
          pricing.map((item) => {
            return (
               <div className="card" key={item.title}>
                           <img src={item.imgUrl} alt={item.title} />
                           <div className="title">
                            <h1>{item.title}</h1>
                            <h1>PACKAGES</h1>
                            <h3>Rs {item.price}</h3>
                            <p>{item.length}</p>
                           </div>
                           <div className="description">
                            <p>   
                              <Check /> Equipment
                            </p>
                            <p>   
                              <Check /> All Day Free Training
                            </p>
                            <p>   
                              <Check /> Free Restroom
                            </p>
                            <p>   
                              <Check /> 24/7 Skilled Support
                            </p>
                            <p>   
                              <Check /> 20 Days Freezing Option
                            </p>
                            <Link to={"/"} >Join Now</Link>
                           </div>
               </div>
            )
          })
        }
      </div>
    </section>
        
  )
}
export default Pricing