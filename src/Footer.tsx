import { styled } from '@mui/material/styles';
import {  IconButton,Box,Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { SiAirtel } from "react-icons/si";
import { SiSamsungpay } from "react-icons/si";
import { IoLogoPaypal } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { SiLiberapay } from "react-icons/si";
import { SiRazorpay } from "react-icons/si";



const Footcont=styled("div")(()=>({
    display:"flex",
    fontFamily: "Nunito, sans-serif",
    alignItems:"flex-start",
    flexDirection:"row",
    paddingTop:30,
    // backgroundColor:"#CECECE",
    backgroundColor:"#5D90E9",
    gap:80,
    color:"black",
    justifyContent:"center", 
    // borderRadius:5,
    height:"48vh"

}));

const Footconter=styled("div")(()=>({
  display:"flex",
  color:"black",
  fontFamily: "Nunito, sans-serif",
  alignItems:"flex-start",
  flexDirection:"row",
  margin:"0",
  // backgroundColor:"#CECECE",
  backgroundColor:"#5D90E9",
  gap:90,
  justifyContent:"center",
  // borderRadius:5,
 
  paddingTop:"10px",


}));

const Footer = () => {
  return (
    <div>
      {/* <div style={{margin:0,padding:5,backgroundColor:"#5D90E9"}}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3504.4101626824595!2d77.1643484!3d28.5574437!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce13c121f9d31%3A0x6ba0267c5a3cc929!2sSuperkicks%20Delhi!5e0!3m2!1sen!2sin!4v1726041031689!5m2!1sen!2sin" 
      width="100%" title='maps' height="200" style={{border:"0", margin:"0",padding:"0"}}></iframe>
      </div> */}
    <Box >
      <Footcont>
      <div  style={{display:"flex",flexDirection:"column"}}>
        <img src="https://www.findyourkicks.com/assets/imagess/footer-logo.png" alt="Find Kicks"
        style={{height:"180px",width:"200px"}} />
      
      <div style={{paddingTop:"9px"}}>
      <a href="https://www.instagram.com/findyourkicksindia/?hl=en"><IconButton sx={{color:"black"}} ><InstagramIcon/></IconButton></a>
      <a href="https://api.whatsapp.com/send/?phone=916284134558&text&type=phone_number&app_absent=0" ><IconButton sx={{color:"black"}} ><FacebookIcon/></IconButton></a>
      <a href="https://www.linkedin.com/company/find-your-kicks-india/"><IconButton sx={{color:"black"}}><YouTubeIcon/></IconButton></a>
      <a href="https://x.com/findyourkicks?lang=en"><IconButton sx={{color:"black"}}><XIcon/></IconButton> </a>
      </div>
      </div>
      
      <div style={{fontFamily:"Nunito,sans-serif"}}>
        <p><b style={{textDecoration:"underline"}}> STORE</b></p>
        <p>FIND STORE</p>
        <p>SKETCHERS</p>
        <p> CAMP</p>
        <p>SHOPPING </p>
      </div>

      <div className='values'>
        <p><b style={{textDecoration:"underline"}}>VALUES</b></p>
        <p>ACCESSIBILITY</p>
        <p>EDUCATION</p>
        <p>ENVIRONMENT</p>
        <p>PRIVACY</p>
      </div>

      <div className='Account'>
        <p><b style={{textDecoration:"underline"}}>ADIDAS </b></p>
        <p>ADIDAS ID</p>
        <p>ADIDASSTORE </p>
        <p>WALLET </p>
        <p>ADIDAS.COM</p>
      </div>

      <div className='About'>
        <p><b style={{textDecoration:"underline"}}>ABOUT</b></p>
        <p>NEWSROOM</p>
        <p>LEADERSHIP</p>
        <p>EVENTS</p>
        <p>CONTACT</p>
      </div>

      <div className='About'>
        <p><b style={{textDecoration:"underline"}}>INFO</b></p>
        <p>HOW KICKS WORKS</p>
        <p>STORES</p>
        <p>BRANDS</p>
        <p>BLOGS</p>
      </div>
      </Footcont>
      <div style={{margin:0,padding:0,backgroundColor:"#5D90E9",display:"flex",
        justifyContent:"center",height:"5vh"}}>
        <Typography variant='h6'>secured checkout with:</Typography>
      </div>
      <div style={{margin:0,paddingTop:"13px",backgroundColor:"#5D90E9",display:"flex",
        justifyContent:"center",gap:"25px",height:"10vh"}}>
      <Typography sx={{marginBottom:"10px"}}><FaCcVisa /></Typography>
      <Typography sx={{marginBottom:"10px"}}><FaCcMastercard /></Typography>
      <Typography sx={{marginBottom:"10px"}}><FaCcAmazonPay /></Typography>
      <Typography sx={{marginBottom:"10px"}}><FaGooglePay /></Typography>
      <Typography sx={{marginBottom:"10px"}}><SiAirtel /></Typography>
      <Typography sx={{marginBottom:"10px"}}><SiPaytm /></Typography>
      <Typography sx={{marginBottom:"10px"}}><IoLogoPaypal /></Typography>
      <Typography sx={{marginBottom:"10px"}}><SiLiberapay /></Typography>
      <Typography sx={{marginBottom:"10px"}}><IoLogoPaypal /></Typography>
      <Typography sx={{marginBottom:"10px"}}><SiSamsungpay /></Typography>
      <Typography sx={{marginBottom:"10px"}}><SiRazorpay /></Typography>
      
      </div>
      
    </Box>
    
    
    <Footconter  >
       <p><a  href="https://www.eshopworld.com/shoppers/help/retailer/nike/terms-and-conditions-of-sale-en/" style={{color:"black",textDecoration:"none"}} >© 2024 All Rights Reserved by FindYourKicks India</a></p> 
        <p><a href="https://www.findyourkicks.com/privacy-policy" style={{color:"black",textDecoration:"none"}}>Privacy Policy</a></p>
        <p><a href="https://www.findyourkicks.com/terms" style={{color:"black",textDecoration:"none"}}>Terms & Condition</a></p>
        <p><a href="https://www.findyourkicks.com/refundpolicy" style={{color:"black",textDecoration:"none"}}>Refund/Return Policy</a></p>
      </Footconter>
      
    </div>
    
  );
};

export default Footer;





