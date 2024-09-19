import React from 'react'
import './Gueststyle.css'
import manShopping from './GuestImages/bestmanshoppingimg.png'


const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px", height: "400px", marginLeft: "120px", marginTop: "100px", }}>
        <div className='ONLINEDiv'>ONLINE</div>
        <div className='SHOPPINGDiv'>SHOPPING</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quam soluta harum quos amet.</div>
       
        <div id="container">
          <button class="learn-more">
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Learn More</span>
          </button>
        </div>




      </div>
      <img src={manShopping} alt="img" style={{ marginLeft: "400px", objectFit: "contain", height: "350px", marginTop: "90px" }} />
    </div>
  )
}

export default Home