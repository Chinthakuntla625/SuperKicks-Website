

import { styled } from '@mui/material/styles';
import { IconButton, Box, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import { FaCcVisa, FaCcMastercard, FaCcAmazonPay, FaGooglePay } from "react-icons/fa";
import { SiAirtel, SiSamsungpay, SiPaytm, SiLiberapay, SiRazorpay } from "react-icons/si";
import { IoLogoPaypal } from "react-icons/io5";

const Footcont = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  fontFamily: "Nunito, sans-serif",
  padding: "30px 10px",
  backgroundColor: "#5D90E9",
  color: "black",
  justifyContent: "center",
}));

const Footconter = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "10px 0",
  backgroundColor: "#5D90E9",
  color: "black",
}));

const Footer = () => {
  return (
    <div>
      <Box>
        <Footcont>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "150px", margin: "10px" }}>
            <img src="https://www.findyourkicks.com/assets/imagess/footer-logo.png" alt="Find Kicks"
              style={{ height: "180px", width: "200px" }} />
            <div style={{ paddingTop: "9px" }}>
              <a href="https://www.instagram.com/findyourkicksindia/?hl=en"><IconButton sx={{ color: "black", marginRight: "10px" }}><InstagramIcon /></IconButton></a>
              <a href="https://api.whatsapp.com/send/?phone=916284134558&text&type=phone_number&app_absent=0"><IconButton sx={{ color: "black", marginRight: "10px" }}><FacebookIcon /></IconButton></a>
              <a href="https://www.linkedin.com/company/find-your-kicks-india/"><IconButton sx={{ color: "black", marginRight: "10px" }}><YouTubeIcon /></IconButton></a>
              <a href="https://x.com/findyourkicks?lang=en"><IconButton sx={{ color: "black", marginRight: "10px" }}><XIcon /></IconButton></a>
            </div>
          </div>

          <div style={{ margin: "10px", textAlign: "center", minWidth: "150px" }}>
            <p><b style={{ textDecoration: "underline" }}>STORE</b></p>
            <p>FIND STORE</p>
            <p>SKETCHERS</p>
            <p>CAMP</p>
            <p>SHOPPING</p>
          </div>

          <div style={{ margin: "10px", textAlign: "center", minWidth: "150px" }}>
            <p><b style={{ textDecoration: "underline" }}>VALUES</b></p>
            <p>ACCESSIBILITY</p>
            <p>EDUCATION</p>
            <p>ENVIRONMENT</p>
            <p>PRIVACY</p>
          </div>

          <div style={{ margin: "10px", textAlign: "center", minWidth: "150px" }}>
            <p><b style={{ textDecoration: "underline" }}>ADIDAS</b></p>
            <p>ADIDAS ID</p>
            <p>ADIDAS STORE</p>
            <p>WALLET</p>
            <p>ADIDAS.COM</p>
          </div>

          <div style={{ margin: "10px", textAlign: "center", minWidth: "150px" }}>
            <p><b style={{ textDecoration: "underline" }}>ABOUT</b></p>
            <p>NEWSROOM</p>
            <p>LEADERSHIP</p>
            <p>EVENTS</p>
            <p>CONTACT</p>
          </div>

          <div style={{ margin: "10px", textAlign: "center", minWidth: "150px" }}>
            <p><b style={{ textDecoration: "underline" }}>INFO</b></p>
            <p>HOW KICKS WORK</p>
            <p>STORES</p>
            <p>BRANDS</p>
            <p>BLOGS</p>
          </div>
        </Footcont>

        <div style={{ margin: 0, padding: 0, backgroundColor: "#5D90E9", display: "flex", justifyContent: "center", height: "5vh" }}>
          <Typography variant='h6'>Secured checkout with:</Typography>
        </div>

        <div style={{ margin: 0, paddingTop: "13px", backgroundColor: "#5D90E9", display: "flex", justifyContent: "center", gap: "25px", height: "10vh" }}>
          <Typography sx={{ marginBottom: "10px" }}><FaCcVisa /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><FaCcMastercard /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><FaCcAmazonPay /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><FaGooglePay /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><SiAirtel /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><SiPaytm /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><IoLogoPaypal /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><SiLiberapay /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><SiSamsungpay /></Typography>
          <Typography sx={{ marginBottom: "10px" }}><SiRazorpay /></Typography>
        </div>
      </Box>

      <Footconter>
        <p><a href="https://www.eshopworld.com/shoppers/help/retailer/nike/terms-and-conditions-of-sale-en/" style={{ color: "black", textDecoration: "none" }}>© 2024 All Rights Reserved by FindYourKicks India</a></p>
        <p><a href="https://www.findyourkicks.com/privacy-policy" style={{ color: "black", textDecoration: "none" }}>Privacy Policy</a></p>
        <p><a href="https://www.findyourkicks.com/terms" style={{ color: "black", textDecoration: "none" }}>Terms & Conditions</a></p>
        <p><a href="https://www.findyourkicks.com/refundpolicy" style={{ color: "black", textDecoration: "none" }}>Refund/Return Policy</a></p>
      </Footconter>
    </div>
  );
};

export default Footer;


