import { styled } from '@mui/material/styles';
import { IconButton, Box, Typography, useMediaQuery } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import { FaCcVisa, FaCcMastercard, FaCcAmazonPay, FaGooglePay } from "react-icons/fa";
import { SiAirtel, SiSamsungpay, SiPaytm, SiLiberapay, SiRazorpay } from "react-icons/si";
import { IoLogoPaypal } from "react-icons/io5";

const BottomContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: "#5E4B8E",
  color: "white",
}));

const SocialSection = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "10px",
}));

const SocialIcons = styled("div")(() => ({
  display: "flex",
  gap: "10px",
  margin: "10px 0",
}));

const Section = styled("div")(() => ({
  margin: "10px",
  textAlign: "center",
  minWidth: "150px",
}));

const PaymentIconsContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  margin: "10px 0",
  color: "orange",
}));

const Footer = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const FooterContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: isSmallScreen ? "column" : "row",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    backgroundColor: "#5E4B8E",
    color: "white",
  }));

  const obj = {
    storeItems: [
      'FIND STORE',
      'SKETCHERS',
      'CAMP',
      'SHOPPING',
      'NEWSROOM',
      'LEADERSHIP',
      'EVENTS',
      'CONTACT'
    ],
    valuesItems: [
      'ACCESSIBILITY',
      'EDUCATION',
      'ENVIRONMENT',
      'PRIVACY','NEWSROOM',
      'LEADERSHIP',
      'EVENTS',
      'CONTACT'
    ],
    aboutItems: [
      'OUR STORY',
      'TEAM',
      'CAREERS',
      'CONTACT US','NEWSROOM',
      'LEADERSHIP',
      'EVENTS',
      'CONTACT'
    ],
    kicksItems: [
      'OUR STORY',
      'TEAM',
      'CAREERS',
      'CONTACT US','NEWSROOM',
      'LEADERSHIP',
      'EVENTS',
      'CONTACT'
    ]
  };

  return (
    <Box>
      <FooterContainer>
        <SocialSection>
          <img
            src="https://www.findyourkicks.com/assets/imagess/footer-logo.png"
            alt="Find Kicks"
            style={{ height: "180px", width: "200px", margin: "10px" }}
          />
          <SocialIcons>
            <a href="https://www.instagram.com/findyourkicksindia/?hl=en">
              <IconButton sx={{ color: "orange" }}><InstagramIcon /></IconButton>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=916284134558&text&type=phone_number&app_absent=0">
              <IconButton sx={{ color: "orange" }}><FacebookIcon /></IconButton>
            </a>
            <a href="https://www.linkedin.com/company/find-your-kicks-india/">
              <IconButton sx={{ color: "orange" }}><YouTubeIcon /></IconButton>
            </a>
            <a href="https://x.com/findyourkicks?lang=en">
              <IconButton sx={{ color: "orange" }}><XIcon /></IconButton>
            </a>
          </SocialIcons>
        </SocialSection>

        <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ flex: 1, p: 2 }}>
          <Section>
            <Typography variant="subtitle1" sx={{ color: "orange" }}><b>STORE</b></Typography>
            {obj.storeItems.map((item, idx) => (
              <Typography variant="body2" key={idx}>{item}</Typography>
            ))}
          </Section>

          <Section>
            <Typography variant="subtitle1" sx={{ color: "orange" }}><b>VALUES</b></Typography>
            {obj.valuesItems.map((item, idx) => (
              <Typography variant="body2" key={idx}>{item}</Typography>
            ))}
          </Section>

          <Section>
            <Typography variant="subtitle1" sx={{ color: "orange" }}><b>ABOUT</b></Typography>
            {obj.aboutItems.map((item, idx) => (
              <Typography variant="body2" key={idx}>{item}</Typography>
            ))}
          </Section>

          <Section>
            <Typography variant="subtitle1" sx={{ color: "orange" }}><b>KICKS</b></Typography>
            {obj.kicksItems.map((item, idx) => (
              <Typography variant="body2" key={idx}>{item}</Typography>
            ))}
          </Section>

        </Box>
      </FooterContainer>

      <BottomContainer>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant='h6' sx={{ color: "white", margin: "10px 0" }}>Secured checkout with:</Typography>
          <PaymentIconsContainer>
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmazonPay />
            <FaGooglePay />
            <SiAirtel />
            <SiPaytm />
            <IoLogoPaypal />
            <SiLiberapay />
            <SiSamsungpay />
            <SiRazorpay />
          </PaymentIconsContainer>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="body2">
              <a href="https://www.eshopworld.com/shoppers/help/retailer/nike/terms-and-conditions-of-sale-en/" style={{ color: "white", textDecoration: "none" }}>© 2024 All Rights Reserved by FindYourKicks India</a>
            </Typography>
            <Typography variant="body2">
              <a href="https://www.findyourkicks.com/privacy-policy" style={{ color: "white", textDecoration: "none" }}>Privacy Policy</a> | 
              <a href="https://www.findyourkicks.com/terms" style={{ color: "white", textDecoration: "none" }}> Terms & Conditions</a> | 
              <a href="https://www.findyourkicks.com/refundpolicy" style={{ color: "white", textDecoration: "none" }}> Refund/Return Policy</a>
            </Typography>
          </Box>
        </Box>
      </BottomContainer>
    </Box>
  );
};

export default Footer;
