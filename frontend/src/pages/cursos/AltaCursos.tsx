import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CursoService from "../../services/CursoService";
import CarreraService from "../../services/CarreraService";
import DocenteService from "../../services/DocenteService";

export default function AltaCursos() {
  const cursoService = new CursoService();
  const carreraService = new CarreraService();
  const docenteService = new DocenteService();

  const classes = useStyles();
  
  const [cursoObject, setCursoObject] = useState({carrera_id: "", carrera_materia_id: "", docente_id: "", fecha_desde: moment().format('YYYY-MM-DD'), cupo_maximo: ""});
  const [carreraCollection, setCarreraCollection] = useState([]);
  const [stateSelectMateria, setStateSelectMateria] = useState(true);
  const [carreraMateriaCollection, setCarreraMateriaCollection] = useState([]);
  const [docenteCollection, setDocenteCollection] = useState([]);

  useEffect(() => {
    loadCarreras();
    loadDocentes();
  }, []);

  const loadCarreras = async () => {
    const result = await carreraService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carreras inexistentes')));
        window.location.href = '/#/itm/cursos';
        return;
    }
    
    setCarreraCollection(result);
  }

  const loadDocentes = async () => {
    const result = await docenteService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Docentes inexistentes')));
        window.location.href = '/#/itm/cursos';
        return;
    }
    
    setDocenteCollection(result);
  }

  const saveCurso = async () => {
    if (cursoObject.carrera_id === "" ||
      cursoObject.carrera_materia_id === "" ||
      cursoObject.docente_id === "" ||
      cursoObject.fecha_desde === "" ||
      cursoObject.cupo_maximo === ""
    ) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await cursoService.create(cursoObject)
    .catch((error: Error) => console.log(error));
    
    if (! result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso existente')));
      return;
    }

    store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Alta de curso exitoso')));
    setTimeout(() => {
      window.location.href = '/#/itm/cursos';
    }, 5000);
  };    

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <h2 className={classes.fontTitle}>
              Alta de curso
            </h2>
            <Grid container style={{marginTop: "2%"}}>
              <Grid item xs={3}>
                  <FormControl style={{width: "80%"}} error={cursoObject.carrera_id === "" ? true : false}>
                    <InputLabel>Carrera</InputLabel>
                    <Select
                      value={cursoObject.carrera_id}
                      required
                      onChange={async (event) => {
                        const carreraId = String(event.target.value);                    
                        setCursoObject((prevValue) => { return {...prevValue, carrera_id: carreraId}});
                        if (carreraId) {
                          setStateSelectMateria(false);

                          const carrerasMaterias = await carreraService.read(Number(carreraId))
                          .catch(error => console.log(error));
                          
                          if (carrerasMaterias.model.carreras_materias.length !== 0) {
                            const carrerasMateriasCollection = carrerasMaterias.model.carreras_materias.filter((carreraMateria: any) => carreraMateria.estado === 'activo');
                            setCarreraMateriaCollection(carrerasMateriasCollection);
                          } else {
                            store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carrera sin materias asociadas')));
                            setCarreraMateriaCollection([]);
                            setCursoObject((prevValue) => { return {...prevValue, carrera_materia_id: ""}})
                          }
                          
                        } else {
                          setStateSelectMateria(true);
                          setCursoObject((prevValue) => { return {...prevValue, carrera_materia_id: ""}})
                        }
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
              <Grid item xs={3}>
                  <FormControl style={{width: "80%"}} error={cursoObject.carrera_materia_id === "" ? true : false}>
                    <InputLabel>Materia</InputLabel>
                    <Select
                      value={cursoObject.carrera_materia_id}
                      required
                      disabled={stateSelectMateria}
                      onChange={(event) => {
                        const carreraMateriaId = String(event.target.value);                    
                        setCursoObject((prevValue) => { return {...prevValue, carrera_materia_id: carreraMateriaId}})
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione la materia</em>
                      </MenuItem>
                      {
                        carreraMateriaCollection.map((carreraMateria: any) => { return (<MenuItem key={Math.random()} value={carreraMateria.id}>{carreraMateria.materia.nombre}</MenuItem>) })
                      }
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={3}>
                  <FormControl style={{width: "80%"}} error={cursoObject.docente_id === "" ? true : false}>
                    <InputLabel>Docente</InputLabel>
                    <Select
                      value={cursoObject.docente_id}
                      required
                      onChange={(event) => {
                        const docenteId = String(event.target.value);                    
                        setCursoObject((prevValue) => { return {...prevValue, docente_id: docenteId}})
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione el docente</em>
                      </MenuItem>
                      {
                        docenteCollection.map((docente: any) => { return (<MenuItem key={Math.random()} value={docente.id}>{`${docente.apellido} ${docente.nombres}`}</MenuItem>) })
                      }
                    </Select>
                  </FormControl>
              </Grid>
            </Grid>
            <Grid container style={{marginTop: "4%"}}>
              <Grid item xs={3}>                
                <TextField 
                  style={{width: "80%"}}
                  id="fecha-desde" 
                  label="Fecha desde"
                  placeholder={"Por favor la fecha desde"} 
                  required
                  type={"date"}
                  defaultValue={(() => {
                    return moment().format('YYYY-MM-DD');
                  })()}    
                  error={cursoObject.fecha_desde === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const fechaDesde = String(e.currentTarget.value);
                    setCursoObject((prevValue) => { return {...prevValue, fecha_desde: fechaDesde}})
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  style={{width: "80%"}} 
                  id="cupo-maximo" 
                  label="Cupo máximo"
                  placeholder={"Por favor ingrese el cupo máximo"} 
                  required
                  type={"number"}
                  error={cursoObject.cupo_maximo === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const cupoMaximo = String(e.currentTarget.value);
                    setCursoObject((prevValue) => { return {...prevValue, cupo_maximo: cupoMaximo}})
                  }}
                />
              </Grid>            
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              type="submit"          
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveCurso}
            >Asociar</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
