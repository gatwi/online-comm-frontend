import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../style/login.css";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MURIFE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({onLogin}) {
  const [loginDetails,setLoginDetails] = useState({userdetails:"",password:""})
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({user: loginDetails})
    }).then(res=>{
      if(res.ok){
        res.json().then(onLogin)
      }
      else{
        res.json().then(console.log)
      }
    })
  };
  const clientId = '402509286566-rc7onvlh0f5n89779pb34hhhkerqv9j6.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });
 const onSuccess = (res) => {
  console.log('success:', res.getBasicProfile());
};
const onFailure = (err) => {
  console.log('failed:', err);
};

  return (
    <div className="login">
      <div>
        <img
          id="phone"
          src="https://images.assetsdelivery.com/compings_v2/liravega258/liravega2581810/liravega258181000007.jpg"
          alt="login image"
        />
      </div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h">
              Welcome back
            </Typography>
            <Typography component="h">
              Enter your details below to login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={e=>setLoginDetails(details=>({...details,userdetails:e.target.value}))}
                value={loginDetails.userdetails}
                label="Username or email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={loginDetails.password}
                onChange={e=>setLoginDetails(details=>({...details,password:e.target.value}))}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <GoogleLogin
             clientId={clientId}
             buttonText="Sign in with Google"
             onSuccess={onSuccess}
             onFailure={onFailure}
             cookiePolicy={'single_host_origin'}
             isSignedIn={true}
             />
              <Grid container>
                <Grid item xs>
                  <Link href="/resetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                Don't have an account?
                  <Link href="/signup" variant="body2">
                    {" Signup"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <div>
        <img
          id="laptop"
          src="https://images.assetsdelivery.com/compings_v2/liravega258/liravega2581810/liravega258181000007.jpg"
          alt="form"
        />
      </div>
    </div>
  );
}
