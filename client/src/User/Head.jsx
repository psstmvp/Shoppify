import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import homelogo from './UserImages/images.png'
import searchicon from './UserImages/searchicon.svg'
import loginicon from './UserImages/loginicon.svg'
import cart from './UserImages/cart.svg'
import seller from './UserImages/seller.svg'
import menu from './UserImages/menu.svg'
import { Badge, IconButton, styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios'


const StyledBadge = styled(Badge)(({ theme }) => ({
  color:"black",
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    
  },
}));

const Head = () => {
  const Id = sessionStorage.getItem("customerId");
  const [cartlength,setCartLength] = useState([]);

  const addCartProduct = () => {
    axios.get(`http://localhost:5000/cartWithBooking/${Id}`).then((response) => {
        console.log(response.data);
        
        const cartLength = response.data.length;
        setCartLength(cartLength)
       
    })
}

useEffect(()=>{
addCartProduct();
},[])

  return (
    <div className='homeHead'>
      <div className='logoSearch'>
        <img src={homelogo} alt='img' style={{ width: "160px", height: "100px", objectFit: "contain" }} />
        <div className='searchdiv'>
          <button className='searchiconbtn' ><img src={searchicon} alt='img' className='searchicon'></img></button>
          <input type='search' name='search' className='searchbox' placeholder='Search for Products, Brands and More'></input>
        </div>

        <div className='dropdown'>
          <div className='Userlinks'>

            <button className="dropbtn"> <img src={loginicon} alt="loginiconimg" className='linklogos' />Login</button>
          </div>
          <div className="dropdown-content">
            <Link to={'/User/PersonalInfo'} className='Userlinks'>MyProfile</Link>
            {/* <Link to={'/User/Editprofile'} className='Userlinks'>EditProfile</Link> */}
            <Link to={'/User/WishList'} className='Userlinks'>WishList</Link>
            <Link to={'/User/Orders'} className='Userlinks'>My Orders</Link>
            <Link to={'/User/Coupons'} className='Userlinks'>Coupons</Link>



          </div>
        </div>

        <div className='Userlinks'>

          <Link to={'/User/PageCart'} className='Userlinks'>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartlength} color="warning">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>

        <div className='Userlinks'>

          <button className="BecomeaSeller"><img src={seller} alt="sellerimg" className='linklogos' />Become a Seller</button>
        </div>

        <div className='Userlinks'>

          <button className="extramenu"><img src={menu} alt="menuimg" className='linklogos' /></button>
        </div>

      </div>



    </div>
  )
}

export default Head