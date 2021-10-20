import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlumnoService from "../../services/AlumnoService";

export default function ModificacionAlumnos() {
  const alumnoService = new AlumnoService();

  const classes = useStyles();
  
  const { id } = useParams();

  const [alumnoObject, setAlumnoObject] = useState({
    nombres: "", 
    apellido: "",
    sexo: "",
    telefono: 0,
    celular: 0,
    email: "",
    fecha_nacimiento: "",
    tipo_doc: "",
    documento: 0,
    domicilio: ""
  });

  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async() => {
    const result = await alumnoService.read(id)
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Alumno inexistente')));
        window.location.href = '/#/ifts/alumnos';
        return;
    }
    
    setAlumnoObject(result.model);
  }

  const updateAlumno = async () => {
    if (alumnoObject.nombres === "" || 
      alumnoObject.apellido === "" ||
      alumnoObject.sexo === "" ||
      alumnoObject.email === "" ||
      ! validateEmail(alumnoObject.email) ||
      alumnoObject.fecha_nacimiento === "" ||
      alumnoObject.documento === 0) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await alumnoService.update(id, alumnoObject);
    
    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Modificación del alumno exitoso')));
      setTimeout(() => {
        window.location.href = '/#/ifts/alumnos';
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
            Modificación de Alumno
          </h2>          
          <form noValidate autoComplete="off" style={{marginTop: 40}}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-nombre" 
                  label="Nombres del alumno"
                  placeholder={"Por favor ingrese los nombres"} 
                  required
                  error={alumnoObject.nombres === "" ? true : false}
                  variant="outlined" 
                  value={alumnoObject.nombres}
                  onChange={(e) => {
                    const nombreAlumno = e.currentTarget.value;
                    setAlumnoObject((prevValue) => { return {...prevValue, nombres: nombreAlumno}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 254) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-apellido" 
                  label="Apellido del alumno"
                  placeholder={"Por favor ingrese el apellido"} 
                  required
                  error={alumnoObject.apellido === "" ? true : false}
                  variant="outlined" 
                  value={alumnoObject.apellido}
                  onChange={(e) => {
                    const apellidoAlumno = e.currentTarget.value;
                    setAlumnoObject((prevValue) => { return {...prevValue, apellido: apellidoAlumno}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 99) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl style={{width: "100%"}} error={alumnoObject.sexo === "" ? true : false}>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    value={alumnoObject.sexo}
                    required
                    onChange={(event) => {
                      const sexoAlumno = String(event.target.value);                    
                      setAlumnoObject((prevValue) => { return {...prevValue, sexo: sexoAlumno}})
                    }}                  
                  >
                    <MenuItem value="">
                      <em>Seleccione el sexo</em>
                    </MenuItem>
                    <MenuItem selected={alumnoObject.sexo === "masculino" ? true : false} value={"masculino"}>Masculino</MenuItem>
                    <MenuItem selected={alumnoObject.sexo === "femenino" ? true : false} value={"femenino"}>Femenino</MenuItem>
                    <MenuItem selected={alumnoObject.sexo === "otros" ? true : false} value={"otros"}>Otros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-telefono" 
                  type="number"
                  label="Teléfono del alumno"
                  placeholder={"Por favor ingrese el teléfono"}   
                  value={alumnoObject.telefono}                         
                  variant="outlined" 
                  onChange={(e) => {
                    const telefonoAlumno = Number(e.currentTarget.value);
                    setAlumnoObject((prevValue) => { return {...prevValue, telefono: telefonoAlumno}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 19) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-celular" 
                  type="number"
                  label="Celular del alumno"
                  placeholder={"Por favor ingrese el celular"} 
                  value={alumnoObject.celular}                         
                  variant="outlined" 
                  onChange={(e) => {
                    const celularAlumno = Number(e.currentTarget.value);
                    setAlumnoObject((prevValue) => { return {...prevValue, celular: celularAlumno}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 19) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-email" 
                  label="Email del alumno"
                  placeholder={"Por favor ingrese el email"}   
                  value={alumnoObject.email}                         
                  required            
                  error={alumnoObject.email === "" || !validateEmail(alumnoObject.email) ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const emailAlumno = e.currentTarget.value;
                    setAlumnoObject((prevValue) => { return {...prevValue, email: emailAlumno}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 99) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-fecha-nac" 
                  label="Fecha nacimiento del alumno"               
                  required
                  type="date"
                  error={alumnoObject.fecha_nacimiento === "" ? true : false}
                  variant="outlined" 
                  value={alumnoObject.fecha_nacimiento}                         
                  onChange={(e) => {
                    const fechaNacAlumno = e.currentTarget.value;
                    setAlumnoObject((prevValue) => { return {...prevValue, fecha_nacimiento: fechaNacAlumno}})
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl style={{width: "100%"}} error={alumnoObject.tipo_doc === "" ? true : false}>
                  <InputLabel>Tipo documento</InputLabel>
                  <Select
                    value={alumnoObject.tipo_doc}
                    required
                    onChange={(event) => {
                      const tipoDocAlumno = String(event.target.value);
                      setAlumnoObject((prevValue) => { return {...prevValue, tipo_doc: tipoDocAlumno}})
                    }}                  
                  >
                    <MenuItem value="">
                      <em>Seleccione el tipo de documento</em>
                    </MenuItem>
                    <MenuItem selected={alumnoObject.tipo_doc === "DNI" ? true : false} value={"DNI"}>DNI</MenuItem>
                    <MenuItem selected={alumnoObject.tipo_doc === "PAS" ? true : false} value={"PAS"}>PASAPORTE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-documento" 
                  label="Documento del alumno"
                  placeholder={"Por favor ingrese el documento"}                   
                  variant="filled"
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  error={alumnoObject.documento === 0 ? true : false}
                  value={alumnoObject.documento}                                         
                  onChange={(e) => {
                    const documentoAlumno = Number(e.currentTarget.value);                    
                    setAlumnoObject((prevValue) => { return {...prevValue, documento: documentoAlumno}})
                  }}
                  onKeyPress={(e: any) => {
                    if (String(e.target.value).length > 8) e.preventDefault();
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  className={classes.textFile} 
                  id="alumno-domicilio" 
                  label="Domicilio del alumno"
                  placeholder={"Por favor ingrese el domicilio"}                   
                  variant="outlined" 
                  value={alumnoObject.domicilio}                         
                  onChange={(e) => {
                    const domicilioAlumno = e.currentTarget.value;
                    setAlumnoObject((prevValue) => { return {...prevValue, domicilio: domicilioAlumno}})
                  }}
                  onKeyPress={(e: any) => {                  
                    if (String(e.target.value).length > 254) e.preventDefault();
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
            onClick={updateAlumno}
          >Actualizar Alumno</Button>
        </CardActions>
      </Card>
    </div>
  );
}
