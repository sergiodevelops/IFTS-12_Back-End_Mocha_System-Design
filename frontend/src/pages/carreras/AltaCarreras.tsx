import React, { useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField } from "@material-ui/core";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CarreraService from "../../services/CarreraService";

export default function AltaCarreras() {
  const carreraService = new CarreraService();

  const classes = useStyles();
  
  const [carreraObject, setCarreraObject] = useState({nombre: ""});

  const saveCarrera = async () => {
    if (carreraObject.nombre === "") {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await carreraService.create(carreraObject);
    
    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Alta de carrera exitosa')));
      setTimeout(() => {
        window.location.href = '/#/itm/carreras';
      }, 5000);
    }
  };    

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <h2 className={classes.fontTitle}>
              Alta Carrera
            </h2>
            <form noValidate autoComplete="off" style={{marginTop: 40}}>
              <TextField 
                id="carrera-nombre" 
                label="Nombre de la carrera"
                placeholder={"Por favor ingrese el nombre"} 
                required
                error={carreraObject.nombre === "" ? true : false}
                variant="outlined" 
                onChange={(e) => {
                  const nombreCarrera = e.currentTarget.value;
                  setCarreraObject((prevValue) => { return {...prevValue, nombre: nombreCarrera}})
                }}
              />
            </form>
          </CardContent>
          <CardActions>
            <Button
              type="submit"          
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveCarrera}
            >Guardar Carrera</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
