import React, { useEffect, useState } from 'react'
import infoicon from './UserImages/infoicon.png'
import safetyimg from './UserImages/safetyimg.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PageCart = () => {
    const Id = sessionStorage.getItem("customerId");
    const [showBookedProduct, setShowBookedProduct] = useState([]);
    const [priceDetails, setPriceDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [showCustomerName, setShowCustomerName] = useState([]);
    const [showCustomerAddress, setShowCustomerAddress] = useState([]);
    const [bookingDate, setBookingDate] = useState('');



    const addCartProduct = () => {
        axios.get(`http://localhost:5000/cartWithBooking/${Id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowBookedProduct(data);




        })
    }

    const getUser = () => {
        axios.get(`http://localhost:5000/getCustomer/${Id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowCustomerName(data.customerName);
            setShowCustomerAddress(data.customerAddress);
        })
    }


    const incrementCount = (id) => {

        axios.put(`http://localhost:5000/updateIncrementCart/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setPriceDetails(data.cartQuantity)
            addCartProduct()

            calculateTotal()
        })
    };

    const decrementCount = (id) => {
        axios.put(`http://localhost:5000/updateDecrementCart/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setPriceDetails(data.cartQuantity);
            addCartProduct();
            calculateTotal()
        })


    };

    const Wishlist = (prdctId) => {
        const data = {
            productId: prdctId,
            customerId: Id
        }
        axios.post(`http://localhost:5000/Wishlist`, data).then((response) => {
            console.log(response.data);
            alert(response.data.message)
        })

    }

    const removeCart = (id) => {
        axios.delete(`http://localhost:5000/deleteCart/${id}`).then((response) => {
            console.log(response.data);
            addCartProduct();
        })
    }

    const calculateTotal = () => {
        axios.get(`http://localhost:5000/CartTotal/${Id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setTotalPrice(data)
        })
    }

    const calculateFutureDate = () => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 7);
        const options = { weekday: 'short', month: 'short', day: 'numeric' }; // Customize date format
        const formattedDate = futureDate.toLocaleDateString('en-US', options); // Format date
        setBookingDate(formattedDate);
    };

    
    useEffect(() => {
        addCartProduct();
        calculateTotal();
        getUser();
        calculateFutureDate();
    }, [])


    return (
        <div className='cartMaindiv'>
            <div>

                <div className='deliveryPinEnter'>
                    <div>

                        <div className='deliveryPinheadlinesTextName'> Deliver To: <div style={{ fontWeight: "600" }}>{showCustomerName}</div></div>
                        <div className='deliveryPinheadlinesText'> {showCustomerAddress}</div>
                    </div>
                    <div className='deliveryPinheadlinesbtn'><button className='DeliveryPincodebtn'>HOME</button></div>
                </div>




                <div className='cartprdctSpecificationDiv'>

                    <div style={{
                        width: "242px",
                        height: "19.594px", display: "flex",
                        position: "absolute",
                        left: "640px"
                    }}> Delivery by {bookingDate} | <div style={{ color: "#878787", marginRight: "5px", marginLeft: "3px" }}>₹40</div></div>

                    {showBookedProduct.map((cartProducts, key) => (
                        <div>
                            <div className='prdctSpecificationandImage'>
                                <div className='pixelImage'><img src={cartProducts.productId.prdctimgsrc} alt="img" style={{ width: "112px", height: "92px", objectFit: "contain" }} /></div>
                                <div className='pixel7aSpecifications'>
                                    <div style={{
                                        fontFamily: "Arial, Helvetica, sans-serif",
                                        fontSize: "16px"
                                    }} >{cartProducts.productId.productName}</div>


                                    <div style={{
                                        fontFamily: "Arial, Helvetica, sans-serif",
                                        fontSize: "12px", color: "#878787", marginTop: "8px"
                                    }} >Seller:IndiFlashMart</div>

                                    <div style={{ display: "flex", }}>

                                        <del style={{ color: "#878787", fontSize: "14px", margin: "22px 10px 0px 0px", fontFamily: "Arial, Helvetica, sans-serif" }}>₹43,999</del>
                                        <div style={{ fontSize: "18px bold", margin: "18px 8px 0px 0px", }}>{cartProducts.productId.productRate}</div>
                                        <div style={{ color: "#388E3C", fontSize: "14px", margin: "22px 12px 0px 0px" }}>13% Off</div>
                                        <div style={{ color: "#388E3C", fontSize: "14px", margin: "22px 0px 0px 0px" }}>2 offers applied</div> <img src={infoicon} alt="img" style={{ width: "14px", height: "14px", objectFit: "contain", margin: "18px 0px 50px 0px" }} />
                                    </div>

                                </div>


                            </div>

                            {/* { console.log(cartProducts._id)
                           } */}
                            <div className='quatityAndRemove'>
                                <button style={{ width: "28px", height: "28px", padding: "1px", borderRadius: "50%", border: "1px solid #e4e7ed" }} onClick={() => decrementCount(cartProducts._id)}>-</button>

                                <div style={{ width: "46px", height: "28px", border: "1px solid #e4e7ed", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "5px", marginRight: "5px" }}>{cartProducts.cartQuantity}</div>
                                <button style={{ width: "28px", height: "28px", padding: "1px", borderRadius: "50%", border: "1px solid #e4e7ed" }} onClick={() => incrementCount(cartProducts._id)}>+</button>
                                <button style={{ fontSize: "16px", fontFamily: "sans-serif", marginLeft: "20px", marginRight: "10px", marginTop: "5px", border: "none", backgroundColor: "#FFFFFF" }} onClick={() => Wishlist(cartProducts.productId._id)}>WISHLIST</button>
                                <button style={{ fontSize: "16px", fontFamily: "sans-serif", marginLeft: "10px", marginRight: "10px", marginTop: "5px", border: "none", backgroundColor: "#FFFFFF" }} onClick={() => removeCart(cartProducts._id)}>REMOVE</button>
                            </div>
                        </div>
                    ))}
                </div>



                <div className='placeorderDiv'>
                    <Link to={'/User/CheckoutPage'} className='myOrderlink'><button className='placeOrderbtn' >PLACE ORDER</button> </Link>
                </div>
            </div>




            <div className='orderSummary'>
                <span className='PricedetailsDiv'>PRICE DETAILS</span>
                <div className='priceAndValue'>
                    <div className='orderSummarypricediv'>Price({priceDetails} items)</div>
                    <span className="orderSummaryValueediv">{totalPrice}</span>
                </div>



                <div className='priceAndValue'>
                    <div className='orderSummarydeliverydiv'>Delivery Charges</div>
                    <span className="orderSummarydiscountdiv"><div style={{ color: "#717478" }}>₹40</div></span>
                </div>

                <div className='priceAndValue'>
                    <div className='packagingFeediv'>Secured Packaging Fee</div>
                    <span className="orderSummarydiscountdiv">₹69</span>
                </div>

                <div className='amountfulldiv'>
                    <div className='totalAmountdiv'>
                        <div className='amountTag'>Total Amount</div>
                        <div className='amount'>{totalPrice + 40 + 69}</div>
                    </div>
                </div>


                <div class="_1RVm3P">
                    <div ><img src={safetyimg} alt="img" className='safetyshieldimg' /></div>
                    <div style={{ marginLeft: "10px" }}> Safe and Secure Payments.Easy returns.100% Authentic products.</div></div>
            </div>
        </div>
    )
}

export default PageCart