import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CursoAlumnoService from "../../services/CursoAlumnoService";
import CarreraService from "../../services/CarreraService";
import AlumnoService from '../../services/AlumnoService';
import CarreraMateriaService from '../../services/CarreraMateriaService';

export default function AltaCursosAlumnos() {
  const cursoAlumnoService = new CursoAlumnoService();
  const carreraService = new CarreraService();
  const carreraMateriaService = new CarreraMateriaService();
  const alumnoService = new AlumnoService();

  const classes = useStyles();
  
  const [cursoAlumnoObject, setCursoAlumnoObject] = useState({carrera_id: "", carrera_materia_id: "", curso_id: "", alumno_id: "", fecha_desde: moment().format('YYYY-MM-DD')});
  const [carreraCollection, setCarreraCollection] = useState([]);
  const [carreraMateriaCollection, setCarreraMateriaCollection] = useState([]);
  const [cursoCollection, setCursoCollection] = useState([]);
  const [alumnoCollection, setAlumnoCollection] = useState([]);
  const [stateSelectMateria, setStateSelectMateria] = useState(true);
  const [stateSelectDocente, setStateSelectDocente] = useState(true);

  useEffect(() => {
    loadCarreras();
    loadAlumnos();
  }, []);

  const loadCarreras = async () => {
    const result = await carreraService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carreras inexistentes')));
        window.location.href = '/#/itm/cursos_alumnos';
        return;
    }
    
    setCarreraCollection(result);
  }

  const loadAlumnos = async () => {
    const result = await alumnoService.list()
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Alumnos inexistentes')));
        window.location.href = '/#/itm/cursos_alumnos';
        return;
    }
    
    setAlumnoCollection(result);
  }

  const saveCursoAlumno = async () => {
    if (cursoAlumnoObject.carrera_id === "" ||
      cursoAlumnoObject.carrera_materia_id === "" ||
      cursoAlumnoObject.curso_id === "" ||
      cursoAlumnoObject.alumno_id === "" ||
      cursoAlumnoObject.fecha_desde === ""
    ) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await cursoAlumnoService.create(cursoAlumnoObject)
    .catch((error: Error) => console.log(error.message));

    if (! result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Verificar si el curso del alumno existe')));
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Verificar las correlativas del alumnos')));
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Verificar si el cupo de los inscriptos llegó a su límite')));
      
      return;
    }

    store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Alta de curso alumno exitoso')));
    setTimeout(() => {
      window.location.href = '/#/itm/cursos_alumnos';
    }, 5000);
  };    

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <h2 className={classes.fontTitle}>
              Alta de Curso Alumno
            </h2>
            <Grid container style={{marginTop: "2%"}}>
              <Grid item xs={3}>
                  <FormControl style={{width: "80%"}} error={cursoAlumnoObject.carrera_id === "" ? true : false}>
                    <InputLabel>Carrera</InputLabel>
                    <Select
                      value={cursoAlumnoObject.carrera_id}
                      required
                      onChange={async (event) => {
                        const carreraId = String(event.target.value);                    
                        setCursoAlumnoObject((prevValue) => { return {...prevValue, carrera_id: carreraId}});
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
                            setCursoAlumnoObject((prevValue) => { return {...prevValue, carrera_materia_id: ""}})
                          }
                          
                        } else {
                          setStateSelectMateria(true);
                          setCursoAlumnoObject((prevValue) => { return {...prevValue, carrera_materia_id: ""}})
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
                  <FormControl style={{width: "80%"}} error={cursoAlumnoObject.carrera_materia_id === "" ? true : false}>
                    <InputLabel>Materia</InputLabel>
                    <Select
                      value={cursoAlumnoObject.carrera_materia_id}
                      required
                      disabled={stateSelectMateria}
                      onChange={async (event) => {
                        const carreraMateriaId = String(event.target.value);                    
                        setCursoAlumnoObject((prevValue) => { return {...prevValue, carrera_materia_id: carreraMateriaId}});
                        if (carreraMateriaId) {
                          setStateSelectDocente(false);

                          const carrerasMaterias = await carreraMateriaService.read(Number(carreraMateriaId))
                          .catch(error => console.log(error));
                          const cursosVigentes = carrerasMaterias.model.cursos.filter((cursoObject: any) => { return cursoObject.fecha_hasta === null}); 
                          
                          if (cursosVigentes.length !== 0) setCursoCollection(cursosVigentes);
                          else {
                            store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Materia sin docentes asociados')));
                            setCursoCollection([]);
                            setCursoAlumnoObject((prevValue) => { return {...prevValue, carrera_materia_id: ""}})
                          }
                          
                        } else {
                          setStateSelectDocente(true);
                          setCursoAlumnoObject((prevValue) => { return {...prevValue, carrera_materia_id: ""}})
                        }
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
                  <FormControl style={{width: "80%"}} error={cursoAlumnoObject.curso_id === "" ? true : false}>
                    <InputLabel>Docente</InputLabel>
                    <Select
                      value={cursoAlumnoObject.curso_id}
                      required
                      disabled={stateSelectDocente}
                      onChange={(event) => {
                        const cursoId = String(event.target.value);                    
                        setCursoAlumnoObject((prevValue) => { return {...prevValue, curso_id: cursoId}})
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione el docente</em>
                      </MenuItem>
                      {
                        cursoCollection.map((curso: any) => { return (<MenuItem key={Math.random()} value={curso.id}>{`${curso.docente.apellido} ${curso.docente.nombres}`}</MenuItem>) })
                      }
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={3}>
                  <FormControl style={{width: "80%"}} error={cursoAlumnoObject.alumno_id === "" ? true : false}>
                    <InputLabel>Alumno</InputLabel>
                    <Select
                      value={cursoAlumnoObject.alumno_id}
                      required
                      onChange={(event) => {
                        const alumnoId = String(event.target.value);                    
                        setCursoAlumnoObject((prevValue) => { return {...prevValue, alumno_id: alumnoId}})
                      }}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione el alumno</em>
                      </MenuItem>
                      {
                        alumnoCollection.map((alumno: any) => { return (<MenuItem key={Math.random()} value={alumno.id}>{`${alumno.apellido} ${alumno.nombres}`}</MenuItem>) })
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
                  error={cursoAlumnoObject.fecha_desde === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const fechaDesde = String(e.currentTarget.value);
                    setCursoAlumnoObject((prevValue) => { return {...prevValue, fecha_desde: fechaDesde}})
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
              onClick={saveCursoAlumno}
            >Asociar</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
