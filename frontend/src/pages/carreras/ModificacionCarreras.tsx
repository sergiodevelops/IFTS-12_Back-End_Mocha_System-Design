import React, { useState, useEffect } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CarreraService from "../../services/CarreraService";

export default function ModificacionCarreras() {
  const carreraService = new CarreraService();

  const classes = useStyles();

  const { id } = useParams();
  
  const [carreraObject, setCarreraObject] = useState({nombre: ""});

  useEffect(() => {
    loadCarrera();
  }, []);

  const loadCarrera = async() => {
    const result = await carreraService.read(id)
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carrera inexistente')));
        window.location.href = '/#/ifts/carreras';
        return;
    }
    
    setCarreraObject(result.model);
  }

  const updateCarrera = async () => {
    if (carreraObject.nombre === "") {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await carreraService.update(id, carreraObject);
    
    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Modificación de carrera exitosa')));
      setTimeout(() => {
        window.location.href = '/#/ifts/carreras';
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
              Modificación de Carrera
            </h2>
            <form noValidate autoComplete="off" style={{marginTop: 40}}>
              <TextField 
                id="carrera-nombre" 
                label="Nombre de la carrera"
                placeholder={"Por favor ingrese el nombre"} 
                required
                error={carreraObject.nombre === "" ? true : false}
                variant="outlined" 
                value={carreraObject.nombre}
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
              onClick={updateCarrera}
            >Actualizar Carrera</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
