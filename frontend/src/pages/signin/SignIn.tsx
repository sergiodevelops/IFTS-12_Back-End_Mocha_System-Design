import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../../services/UserService';
import logo from "../../logo.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
  },
  logotypeImage: {
    borderRadius: 25,
    width: 80,  
  }
}));

export default function SignIn() {
  const classes = useStyles();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async(event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (! username || ! password) return alert('Ingrese el nombre de usuario y la contraseña');

    const service = new UserService;
    const userObject = await service.signIn(username, password)
    .catch((error: Error) => alert(error.message));

    if (! userObject) return;
    
    localStorage.setItem('user', JSON.stringify(userObject.user));
    window.location.reload();
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} alt="ITM" className={classes.logotypeImage} />
          <Typography component="h1" variant="h5">
            ITM - Inicio sesión
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-contraseña"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signIn}
            >
              Ingresar
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
