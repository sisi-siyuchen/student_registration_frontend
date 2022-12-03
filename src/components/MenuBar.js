import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { TOKEN_COOKIE_NAME } from '../constant';
import cookie from "react-cookies";


export default function MenuBar() {
  // the default value of open is false, setOpen to switch on/off
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  

  //JS Truthy
  //Convert anything to boolean. exist => true, not exist (undefined, null, 0, ""...) => false
  let hasLoggedIn = !!cookie.load(TOKEN_COOKIE_NAME);
  let buttonText = hasLoggedIn ? "Logout" : "Login";

  const handleClickOpen = () => {
    if (hasLoggedIn){
      //Log out logic -> remove cookie
      cookie.remove(TOKEN_COOKIE_NAME)
      window.location.reload();

    } else {
      //Log in logic
      setLoginOpen(true);
    }
    
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  }

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Course Registration Service
          </Typography>
          <Button color="inherit" component={ Link } to="/">AllCourses</Button>
          <Button color="inherit" component={ Link }  to="enrolled-courses">EnrolledCourses</Button>
          <Button color="inherit" onClick={handleClickOpen}>{buttonText}</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={loginOpen} handleClose={handleLoginClose} handleRegisterOpen={handleRegisterOpen}/>
      <RegisterDialog open={registerOpen} handleClose={handleRegisterClose} />
    </Box>
  );
}
