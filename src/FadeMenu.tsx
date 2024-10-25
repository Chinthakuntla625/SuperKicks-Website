import * as React from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from './Cartslice';


export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const kicksID = sessionStorage.getItem("KicksID");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [first, setFirst] = React.useState<string>('');

  React.useEffect(() => {
    if (kicksID===null) {
      <Avatar  sx={{ width: 31, height: 31, fontSize: '14px', bgcolor: 'black' }}>
          <b style={{color:"white"}}>!</b>
        </Avatar> 
    }
    else if(kicksID){
      
        const getFirstLetters = (str: string): string => {
          return str.split(' ')
                    .map(word => word.charAt(0))
                    .join('');
        };
        setFirst(getFirstLetters(kicksID));

    }
  }, [kicksID]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddress = () => {
    navigate('./AddressPack');
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      localStorage.clear();
      dispatch(clearCart());
      navigate('/Forms');
    }
  };

  const handleHistory = () => {
    navigate('./OrderHistory');
  };

  const handleLogin = () => {
    navigate('/Forms');
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <PersonPinIcon style={{ fontSize: "35px", color: "black" }} />
        <Avatar sx={{ width: 31, height: 31, fontSize: '14px', bgcolor: '#fe5a1d' , }}>
          <b>{first.toUpperCase()}</b>
        </Avatar>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <b style={{ color: 'red' }}>{kicksID}</b>
        </MenuItem>

        
        {kicksID ? (
          <Button
            variant='text'
            size="medium"
            style={{
              color: 'black',
              backgroundColor: "transparent",
              fontWeight: "bold",
              marginLeft: "9px"
            }}
            onClick={handleAddress}
          >
            Address
          </Button>
        ) : (
          <Button
            variant='text'
            size="medium"
            style={{
              color: 'black',
              backgroundColor: "transparent",
              fontWeight: "bold",
              marginLeft: "9px"
            }}
            onClick={handleClick}
          >
           -
          </Button>
        )}
        
      
        {kicksID ? (
          <Button
            variant='text'
            size="medium"
            style={{
              color: 'black',
              backgroundColor: "transparent",
              fontWeight: "bold",
              marginLeft: "9px"
            }}
            onClick={handleHistory}
          >
            Order History
          </Button>
        ) : (
          <Button
            variant='text'
            size="medium"
            style={{
              color: 'black',
              backgroundColor: "transparent",
              fontWeight: "bold",
              marginLeft: "9px"
            }}
            onClick={handleClick}
          >
           -
          </Button>
        )}


        {kicksID ? (
          <Button
            variant='text'
            size="medium"
            style={{
              color: 'black',
              backgroundColor: "transparent",
              fontWeight: "bold",
              marginLeft: "9px"
            }}
            onClick={handleLogout}
          >
            LogOut
          </Button>
        ) : (
          <Button
            variant='text'
            size="medium"
            style={{
              color: 'black',
              backgroundColor: "transparent",
              fontWeight: "bold",
              marginLeft: "9px"
            }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        )}
      </Menu>
    </div>
  );
}

