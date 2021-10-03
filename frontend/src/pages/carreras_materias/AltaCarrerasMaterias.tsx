import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, FormLabel, FormControlLabel, Checkbox, Divider, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CarreraService from "../../services/CarreraService";
import CarreraMateriaService from "../../services/CarreraMateriaService";
import MateriaService from "../../services/MateriaService";

export default function AltaCarrerasMaterias() {
  const carreraService = new CarreraService();
  const carreraMateriaService = new CarreraMateriaService();
  const materiaService = new MateriaService();

  const classes = useStyles();
  
  const [carreraCollection, setCarreraCollection] = useState([]);
  const [materiaCollection, setMateriaCollection] = useState([]);
  const [carreraMateriaObject, setCarreraMateriaObject] = useState({carrera_id: "", materia_id: "", duracion: ""});
  const [stateSelectMateria, setStateSelectMateria] = useState(true);    

  useEffect(() => {
    loadCarreras();
    loadMaterias();
  }, []);

  const loadCarreras = async() => {
    const result = await carreraService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carreras inexistentes')));
        window.location.href = '/#/itm/carreras_materias';
        return;
    }

    setCarreraCollection(result);
  } 

  const loadMaterias = async() => {
    const result = await materiaService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Materias inexistentes')));
        window.location.href = '/#/itm/carreras_materias';
        return;
    }

    setMateriaCollection(result);
  } 

  const saveCarreraMateria = async () => {
    if (carreraMateriaObject.carrera_id === "" || 
      carreraMateriaObject.materia_id === "" ||
      carreraMateriaObject.duracion === "") {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const resultCarreraMateria = await carreraMateriaService.create(carreraMateriaObject)
    .catch((error: Error) => {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'No puede asociar la carrera/materia ya que hay una vigente')));
      return false;
    });
    
    if (resultCarreraMateria) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Asociación de carrera con materias exitosa')));
      setTimeout(() => {
        window.location.href = '/#/itm/carreras_materias';
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
              Asociación de Carrera con Materia
            </h2>
            <form noValidate autoComplete="off" style={{marginTop: 40}}>
              <h4 className={classes.fontTitle}>
                Carrera
              </h4>
              <Grid container>
                <Grid item xs={4}>
                    <FormControl style={{width: "80%"}} error={carreraMateriaObject.carrera_id === "" ? true : false}>
                      <InputLabel>Carrera</InputLabel>
                      <Select
                        value={carreraMateriaObject.carrera_id}
                        required
                        onChange={async (event) => {
                          const carreraId = String(event.target.value);                    
                          setCarreraMateriaObject((prevValue) => { return {...prevValue, carrera_id: carreraId}});
                          if (carreraId) setStateSelectMateria(false);
                          else setStateSelectMateria(true);
                        }}                  
                      >
                        <MenuItem value="">
                          <em>Seleccione la carrera</em>
                        </MenuItem>
                        {
                          carreraCollection.map((carrera: any) => { return (<MenuItem key={Math.random()} value={carrera.id}>{carrera.nombre}</MenuItem>) })
                        }
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl style={{width: "80%"}} error={carreraMateriaObject.materia_id === "" ? true : false}>
                    <InputLabel>Materia</InputLabel>
                    <Select
                      value={carreraMateriaObject.materia_id}
                      required
                      disabled={stateSelectMateria}
                      onChange={(event) => {
                        const materiaId = String(event.target.value);                    
                        setCarreraMateriaObject((prevValue) => { return {...prevValue, materia_id: materiaId}})
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione la materia</em>
                      </MenuItem>
                      {
                        materiaCollection.map((materia: any) => { return (<MenuItem key={Math.random()} value={materia.id}>{materia.nombre}</MenuItem>) })
                      }
                    </Select>
                  </FormControl>
                </Grid>    
                <Grid item xs={4}>
                  <FormControl style={{width: "80%"}} error={carreraMateriaObject.duracion === "" ? true : false}>
                    <InputLabel id="demo-simple-select-error-label">Duración</InputLabel>
                    <Select
                      value={carreraMateriaObject.duracion}
                      onChange={(event) => {
                        const duracionMateria = String(event.target.value);
                        setCarreraMateriaObject((prevValue) => { return {...prevValue, duracion: duracionMateria}})
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione la duración</em>
                      </MenuItem>
                      <MenuItem value={"cuatrimestral"}>Cuatrimestral</MenuItem>
                      <MenuItem value={"anual"}>Anual</MenuItem>
                    </Select>
                  </FormControl>
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
              onClick={saveCarreraMateria}
            >Asociar Carrera con Materias</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
