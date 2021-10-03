import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, Select, InputLabel, MenuItem, FormControlLabel, Checkbox, FormLabel } from "@material-ui/core";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import MateriaService from "../../services/MateriaService";
import TurnoService from "../../services/TurnoService";

export default function AltaMaterias() {
  const materiaService = new MateriaService();
  const turnoService = new TurnoService();

  const classes = useStyles();
  
  const [materiaObject, setMateriaObject] = useState({nombre: "", duracion: "", turnos: []});
  const [turnoCollection, setTurnoCollection] = useState([]);
  const [turnosId, setTurnosId] = useState([]);

  useEffect(() => {
    loadTurnos();
  }, []);

  const saveMateria = async () => {
    if (materiaObject.nombre === "" || turnosId.length === 0) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    materiaObject.turnos = turnosId;

    const result = await materiaService.create(materiaObject);
    
    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Alta de materia exitosa')));
      setTimeout(() => {
        window.location.href = '/#/itm/materias';
      }, 5000);
    }
  };   
  
  const loadTurnos = async() => {
    const result = await turnoService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Hubo un error al recuperar los turnos de las materias')));
        window.location.href = '/#/itm/materias';
        return;
    }

    setTurnoCollection(result);
  }

  const handleChangeTurnos = (turno_id: number) => {
    setTurnosId((prevState: any) => prevState.findIndex((element: any) => element.turno_id === turno_id) !== -1 ? prevState.filter((materiaFiltered: any) => materiaFiltered.turno_id !== turno_id) : [...prevState, {turno_id: turno_id}]);
  } 

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <h2 className={classes.fontTitle}>
              Alta Materia
            </h2>
            <form noValidate autoComplete="off" style={{marginTop: 40}}>
              <Grid item xs={4}>
                <TextField 
                  id="materia-nombre" 
                  label="Nombre de la materia"
                  placeholder={"Por favor ingrese el nombre"} 
                  required
                  error={materiaObject.nombre === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const nombreMateria = e.currentTarget.value;
                    setMateriaObject((prevValue) => { return {...prevValue, nombre: nombreMateria}})
                  }}
                />
              </Grid>              
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={10}>
                    <FormControl style={{marginTop: 50, marginBottom: 30}} required={true} error={turnosId.length === 0}>
                      <FormLabel 
                        component="legend"
                        required={true}
                        error={turnosId.length === 0}
                        className={classes.fontTitle}
                        style={{fontWeight: "bolder"}}
                      >
                        Turnos
                      </FormLabel>                      
                    </FormControl>            
                  </Grid>
                  {
                    turnoCollection.map((turno: any, index) => {
                      return (
                        <Grid 
                          key={Math.random()}
                          item xs={4}
                          style={{float: 'left'}}
                        >                        
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event: any) => {
                                  handleChangeTurnos(parseInt(event.target.value));
                                }}
                                key={index}
                                value={turno.id}
                                name={turno.nombre}
                                color="primary"  
                                checked={turnosId.findIndex((element: any) => element.turno_id === turno.id) !== -1}
                              />
                            }
                            label={turno.nombre}   
                          />
                        </Grid>
                      );        
                    })
                  }   
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
              onClick={saveMateria}
            >Guardar Materia</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
