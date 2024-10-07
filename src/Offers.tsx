import Card from '@mui/material/Card';
import SellIcon from '@mui/icons-material/Sell';
import Typography from '@mui/material/Typography';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';


export default function Offers() {
  return (
    <div>
    <Typography variant='h6'fontSize='medium' sx={{mt:2,}}>BEST OFFERS <CardGiftcardIcon fontSize='small'sx={{mb:1}}/></Typography>
    <Card sx={{mt:1, backgroundColor:"",mb:2}} >
     
        <Typography variant="body2" style={{margin:"4px"}}>
        <SellIcon fontSize='small' style={{color:"green",marginRight:"4px"}} /><b>Bank Offer 5% </b> Unlimited Cashback on Flipkart Axis Bank Credit Card
        </Typography>
        <Typography variant="body2" style={{margin:"4px"}}>
        <SellIcon fontSize='small' style={{color:"green",marginRight:"4px"}} /><b>Flat INR 50</b> Instant Discount on HDFC Bank 6 month and above Credit Card EMI Trxn.
        </Typography>
        
    
    </Card>
    </div>
  );
}
