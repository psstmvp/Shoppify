import React, { useEffect, useState } from 'react'
import MobileAdd from './UserImages/mobileAdd.jpg'
// import memorycard from './UserImages/memmorycard.jpg'
import wishlistIcon from './UserImages/wishlistIcon.svg'
// import wishlistColorIcon from './UserImages/wishlistColorIcon.svg'
import assuredlogo from './UserImages/flipkartAssuredlogo.png'
import ratingstar from './UserImages/ratingstar.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, Menu, MenuItem } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';


function valuetext(value) {
    return `${value}`;
}

const Mobiles = () => {
    const { id } = useParams();
    console.log(id);
    const Id = sessionStorage.getItem("customerId");


    const [showPrdcts, setShowPrdct] = useState([]);
    const [showPrdctsCopy, setShowPrdctCopy] = useState([]);
    const [showCategoryName, setCategoryName] = useState('');
    const [value, setValue] = React.useState([100, 1000]);
    const [prdctlnght, setPrdctlnght] = useState([]);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [showSubCategory, setShowSubCategory] = useState([]);
    const [subCategoryIds, setSubCategoryIds] = useState([]);

   const clearFilter = () =>{
    setValue([100,1000]);
    setShowPrdct(showPrdctsCopy);
   }

    
   


    const handleChange = (event, newValue) => {
        const [one, two] = newValue
        setShowPrdct(showPrdctsCopy);
        const filteredProductsByPrice = showPrdctsCopy.filter(
            (productsFiltration) => parseInt(productsFiltration.productRate) > one && parseInt(productsFiltration.productRate) < two
        )
        setShowPrdct(filteredProductsByPrice);
        setValue(newValue);
        // console.log(showPrdcts);
        console.log(filteredProductsByPrice);
    };


    const Wishlist = (prdctId) => {
        const data = {
            productId: prdctId,
            customerId: Id
        }
        axios.post(`http://localhost:5000/Wishlist`, data).then((response) => {
            console.log(response.data);
        })
    }
    const fetchSubcategory = () => {
        axios.get(`http://localhost:5000/getSubCategoryByCategoryId/${id}`).then((response) => {
            console.log(response.data);
            const data = response.data;
            setShowSubCategory(data);

        })
    }

    const subcategoryBasedProducts = (subCategoryId) => {
        // Assuming setSubCategoryIds is a state setter function provided by React useState hook
        // Assuming subCategoryIds is a state variable holding an array of subcategory IDs

        // Update the state to include the new subcategory ID
        setSubCategoryIds((prevState) => {
            // Using spread operator to create a new array with the previous state and the new subcategory ID
            const updatedIds = [...prevState, subCategoryId];
            // Making the API call using Axios
            axios.get(`http://localhost:5000/subCategoryMobileProducts/${updatedIds}`)
                .then((response) => {
                    // Once the data is fetched, log it and update the state to show the products
                    console.log(response.data);
                    setShowPrdct(response.data);
                })
                .catch((error) => {
                    // Handle any errors that occur during the API call
                    console.error('Error fetching products:', error);
                });

            // Return the updated array of subcategory IDs
            return updatedIds;
        });
    }


    useEffect(() => {
        fetchSubcategory();
        axios.get(`http://localhost:5000/geMobileProduct/${id}`).then((response) => {
            console.log(response.data);

            const CategoryName = response.data.length;
            setPrdctlnght(CategoryName);
            const data = response.data;

            setShowPrdct(data);
            setShowPrdctCopy(data)
            console.log(CategoryName);
        })
    }, [])


    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length <= maxWords) {
            return text;
        }
        return words.slice(0, maxWords).join(' ');
    }


    return (
        <div>

            <div className='hoverPrdctNames'>
                <span className='spanRelatedPrdctNames'>Electronics</span>
                <span className='spanRelatedPrdctNames'>TVs & Appliences</span>
                <span className='spanRelatedPrdctNames'>Men</span>
                <span className='spanRelatedPrdctNames'>Women</span>
                <span className='spanRelatedPrdctNames'>Baby & Kids</span>
                <span className='spanRelatedPrdctNames'>Home & Furniture</span>
                <span className='spanRelatedPrdctNames'>Sports,Books&More</span>
                <span className='spanRelatedPrdctNames'>Flights</span>
                <span className='spanRelatedPrdctNames'>Offer Zone</span>
            </div>

            <div style={{ display: "flex" }}>
                <div>
                    <div className='relatedPrdctsSideSection'>

                        <div className='relatedcardimg'>
                            <img src={MobileAdd} alt="img" style={{ width: "267px", height: "144px", objectFit: "contain" }} />
                            <hr></hr>
                        </div>
                        <div className='imgdetails'>

                            <div style={{ padding: "10px 0px 0px 15px", fontSize: "18px", fontFamily: "Roboto,Arial,sans-serif" }}>Top Selling Smartphones</div>
                            <div style={{ padding: "0px 0px 0px 15px", fontSize: "14px" }}>Latest Technology,Best Brands</div>
                        </div>

                        <div className='filterSection'>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ fontSize: "18px", fontFamily: "Roboto,Arial,sans-serif" }}>Filters</div>
                                <button style={{ fontSize: "12px", fontFamily: "Roboto,Arial,sans-serif", fontWeight: "500", color: "#2874f0" }} onClick={clearFilter}>CLEAR ALL</button>
                            </div>

                            <div className='pricefilter'>

                                <Box sx={{ width: 300 }}>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                        min={1000} // Set the minimum value of the slider
                                        max={30000} // Set the maximum value of the slider

                                    />
                                </Box>
                            </div>
                        </div>


                        <div className='availabilities'>

                            <div className="brand_Style">
                                <details style={{width:"238px",height:"18.188px" }}>


                                    <summary >BRAND</summary>
                                   

                                    {showSubCategory.map((subCategories, key) => (
                                        <div style={{backgroundColor:"white",width:"238px",paddingLeft:"10px",paddingRight:"6px"}}>
                                            <input
                                                type="checkbox"
                                                style={{ margin: "10px", }}
                                                onClick={() => subcategoryBasedProducts(subCategories._id)}
                                            />
                                            {subCategories.subCategoryName} <br />
                                        </div>
                                    ))}
                                </details>
                            </div>




                            {/* <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                BRAND
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            > */}
                            {/*                                
                                    <MenuItem sx={{ width: "238px" }} onClick={() => subcategoryBasedProducts(subCategories._id)}>
                                        <Checkbox size="small" />
                                        
                                    </MenuItem> */}

                            {/* <MenuItem > <Checkbox  size="small"/>Realme</MenuItem>
                                <MenuItem > <Checkbox  size="small"/>Samsung</MenuItem>
                                <MenuItem > <Checkbox size="small"/>Apple</MenuItem>
                                <MenuItem > <Checkbox size="small"/>Google</MenuItem>
                                <MenuItem > <Checkbox size="small"/>Motorolla</MenuItem>
                                <MenuItem > <Checkbox size="small"/>Redmi</MenuItem> */}

                        </div>



                    </div>
                </div>

                <div className='productShowing'>
                    <div className='headandtitlesdiv'>
                        <div style={{
                            fontSize: "12px",
                            color: "#878787",
                            fontFamily: "Roboto,Arial,sans-serif"
                        }}>
                            Home - Computers - Storage
                        </div>
                        <div style={{
                            fontSize: "12px",
                            color: "#2874f0",
                            fontFamily: "Roboto,Arial,sans-serif",
                            marginTop: "12px"
                        }}>
                            Computers,Lexar storage,Crucial Storage,Toshiba Storage,SSD,Sandisk Storage,HHD,Pendrives,SSD Storage,Memmory cards
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginTop: "10px", }}>

                            <div style={{
                                fontSize: "18px",
                                color: "#black",
                                fontFamily: "Roboto,Arial,sans-serif",
                                marginRight: "10px"
                            }}>{showCategoryName}</div>

                            <div style={{
                                fontSize: "12px",
                                color: "#878787",
                                fontFamily: "Roboto,Arial,sans-serif"
                            }}>(Showing 1 - {prdctlnght} products of {prdctlnght} products)</div>
                        </div>

                        <div style={{ display: "flex", marginTop: "10px" }}>
                            <div className='sortingProducts'>
                                Sort by
                            </div>
                            <div className='sortingProducts'>
                                Popularity
                            </div>
                            <div className='sortingProducts'>
                                Price--Low To High
                            </div>
                            <div className='sortingProducts'>
                                Price--High To Low
                            </div>
                            <div className='sortingProducts'>
                                Newest First
                            </div>
                        </div>
                    </div>

                    <div className='Allprdctcards'>
                        {showPrdcts.map((productsdtls, key) => (



                            <div className='prdctcards'>
                                {
                                    console.log(productsdtls)
                                }

                                <div className='wishlistIconDiv'>
                                    <div className='wishlistIconDiv2'>
                                        <button onClick={() => Wishlist(productsdtls._id)}>
                                            <img src={wishlistIcon} alt="img" />
                                        </button>
                                    </div>
                                </div>

                                <div className='imgdiv'>
                                    <Link to={`/User/ProductDetails/${productsdtls._id
                                        }`} className='Userlinks'><img src={productsdtls.prdctimgsrc} alt="img" className='imagestyling' /></Link>
                                </div>

                                <div style={{ padding: "10px" }}>

                                    <div style={{ fontSize: "14px" }}>{truncateText(productsdtls.ProductDescription, 7) + '...'}</div>



                                    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                                        <div style={{
                                            width: "39.47px",
                                            height: "19px",
                                            backgroundColor: "green",
                                            color: "white",
                                            padding: "2px 4px 2px 6px",
                                            borderRadius: "3px",
                                            marginRight: "5px"
                                        }}>4.4 <img src={ratingstar} alt="img" className='ratingstar' /></div>

                                        <div style={{
                                            width: "70px", height: "17", padding: "0px 0px 0px 8px",
                                            backgroundColor: "#878787", marginRight: "5px",
                                        }}>(1,02,116)</div>
                                        <div><img src={assuredlogo} alt="img" className='flipkartAssuredlogo' /></div>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mobiles