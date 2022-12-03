import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { AuthService } from '../service/AuthService';
import { useRef} from 'react';


export default function RegisterDialog(props) {
  
  const [errorMsg, setError] = React.useState("");
  const [username, password, email, firstname, lastname] = [useRef(), useRef(), useRef(), useRef(), useRef()];

  function register() {
    //reset error messages
    if (!username.current.value || !password.current.value || !email.current.value){
        //1. check if any of the required fields is missing
        setError("Please enter the required fields (username/password/email");
    } else if (!password.current.value.match(/(?=^.{4,100}$).*$/)){
        //2. check the length of password, 4 <= length <= 100
        setError("The password length must be greater or equal to 4!")
    } else if (!email.current.value.match(/.+@.+/)){
        //3. check email format
        setError("Email format is not valid!")
    } else {
        const userInfo = {
            "login" : username.current.value,
            "password": password.current.value,
            "email": email.current.value,
            "firstName": firstname.current.value,
            "lastName": lastname.current.value,
            "langKey": "en"
        }
        AuthService.register(userInfo).then(response => {
            // close the register dialog if registration is successful
            props.handleClose();
            alert("Thank you for registration. Please check your email to active your account!")
        }).catch(error => {
            console.error(error);
            // only case to fail would be the username is already in use
            setError("Sorry, this username is already in use! Please choose another one.");
        })
    }
  };


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Register as a student"}
        </DialogTitle>

        <DialogContent>
            <TextField id="standard-basic" required label="Username" variant="standard" fullWidth autoFocus inputRef={username}/>
            <TextField id="standard-basic" required label="Password" variant="standard" type={"password"} fullWidth inputRef={password}/>
            <TextField id="standard-basic" required label="Email" variant="standard" type={"email"} fullWidth inputRef={email}/>

            <TextField id="standard-basic" label="Firstname" variant="standard" fullWidth inputRef={firstname}/>
            <TextField id="standard-basic" label="Lastname" variant="standard" fullWidth inputRef={lastname}/>

            <DialogContentText id="alert-dialog-description" style={{"color": "red"}}>
                {errorMsg}
            </DialogContentText>

        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={register} >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
