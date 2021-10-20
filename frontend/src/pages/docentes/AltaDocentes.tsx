import React, { useState } from "react";
import { TextField, Grid, CardContent, Card, CardActions, Button } from "@material-ui/core";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import DocenteService from "../../services/DocenteService";

export default function AltaDocentes() {
  const docenteService = new DocenteService();

  const classes = useStyles();
  
  const [docenteObject, setDocenteObject] = useState({
    nombres: "", 
    apellido: "",
    telefono: 0,
    celular: 0,
    email: "",
  });

  const saveDocente = async () => {
    if (docenteObject.nombres === "" || 
      docenteObject.apellido === "" ||
      docenteObject.email === "" ||
      ! validateEmail(docenteObject.email)) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await docenteService.create(docenteObject);
    
    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Alta de docente exitoso')));
      setTimeout(() => {
        window.location.href = '/#/ifts/Docentes';
      }, 5000);
    }
  }; 
  
  const validateEmail = (email: string) => {
    return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email);
  }

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <h2 className={classes.fontTitle}>
            Alta Docente
          </h2>          
          <form noValidate autoComplete="off" style={{marginTop: 40}}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="docente-nombre" 
                  label="Nombres del docente"
                  placeholder={"Por favor ingrese los nombres"} 
                  required
                  error={docenteObject.nombres === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const nombreDocente = e.currentTarget.value;
                    setDocenteObject((prevValue) => { return {...prevValue, nombres: nombreDocente}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 254) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="docente-apellido" 
                  label="Apellido del docente"
                  placeholder={"Por favor ingrese el apellido"} 
                  required
                  error={docenteObject.apellido === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const apellidoDocente = e.currentTarget.value;
                    setDocenteObject((prevValue) => { return {...prevValue, apellido: apellidoDocente}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 99) e.preventDefault();
                  }}
                />
              </Grid>              
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="docente-telefono" 
                  type="number"
                  label="Teléfono del docente"
                  placeholder={"Por favor ingrese el teléfono"}                   
                  variant="outlined" 
                  onChange={(e) => {
                    const telefonoDocente = Number(e.currentTarget.value);
                    setDocenteObject((prevValue) => { return {...prevValue, telefono: telefonoDocente}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 19) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="docente-celular" 
                  type="number"
                  label="Celular del docente"
                  placeholder={"Por favor ingrese el celular"}                   
                  variant="outlined" 
                  onChange={(e) => {
                    const celularDocente = Number(e.currentTarget.value);
                    setDocenteObject((prevValue) => { return {...prevValue, celular: celularDocente}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 19) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="docente-email" 
                  label="Email del docente"
                  placeholder={"Por favor ingrese el email"}       
                  required            
                  error={docenteObject.email === "" || !validateEmail(docenteObject.email) ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const emailDocente = e.currentTarget.value;
                    setDocenteObject((prevValue) => { return {...prevValue, email: emailDocente}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 99) e.preventDefault();
                  }}
                />
              </Grid>                                          
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button
            type="submit"          
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={saveDocente}
          >Guardar Docente</Button>
        </CardActions>
      </Card>
    </div>
  );
}
