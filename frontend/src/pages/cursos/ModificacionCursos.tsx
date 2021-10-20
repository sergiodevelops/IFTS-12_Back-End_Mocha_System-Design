import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CursoService from "../../services/CursoService";
import { useParams } from 'react-router-dom';

export default function AltaCarrerasMateriasDocentes() {
  const cursoService = new CursoService();

  const classes = useStyles();

  const { id } = useParams();
  
  const [cursoObject, sursoObject] = useState({docente: {}, carreras_materia: { carrera: {id: "", nombre: ""}, materia: {id: "", nombre: ""}}, carrera_id: "", carrera_materia_id: "", docente_id: "", fecha_desde: moment().format('YYYY-MM-DD'), cupo_maximo: ""});
  const [carreraCollection, setCarreraCollection] = useState<any>([]);
  const [carreraMateriaCollection, setCarreraMateriaCollection] = useState<any>([]);
  const [docenteCollection, setDocenteCollection] = useState<any>([]);

  useEffect(() => {
    loadCurso();
  }, []);

  const loadCurso = async() => {
    const result = await cursoService.read(id)
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso inexistente')));
        window.location.href = '/#/ifts/cursos';
        return;
    }

    const curso = result.model;
    curso.carrera_id = curso.carreras_materia.carrera.id;

    sursoObject(curso);
    setCarreraCollection((prevState: any) => [...prevState, curso.carreras_materia.carrera]);
    setCarreraMateriaCollection((prevState: any) => [...prevState, curso.carreras_materia]);
    setDocenteCollection((prevState: any) => [...prevState, curso.docente]);
  }

  const updateCurso = async () => {
    if (cursoObject.carrera_id === "" ||
      cursoObject.carrera_materia_id === "" ||
      cursoObject.docente_id === "" ||
      cursoObject.fecha_desde === "" ||
      cursoObject.cupo_maximo === ""
    ) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
      return;
    }

    const result = await cursoService.update(id, cursoObject)
    .catch((error: Error) => console.log(error));

    if (! result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Curso existente')));
      return;
    }

    store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Modificación de curso exitosa')));
    setTimeout(() => {
      window.location.href = '/#/ifts/cursos';
    }, 5000);
  };    

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <h2 className={classes.fontTitle}>
              Modificación de Curso
            </h2>
            <Grid container style={{marginTop: "2%"}}>
              <Grid item xs={3}>
                  <FormControl style={{width: "80%"}} error={cursoObject.carrera_id === "" ? true : false}>
                    <InputLabel>Carrera</InputLabel>
                    <Select
                      value={cursoObject.carrera_id}
                      required
                      disabled
                      onChange={() => {}}                  
                    >
                      <MenuItem value="">
                        <em>Seleccione la carrera</em>
                      </MenuItem>
                      {
                        carreraCollection.map((carrera: any) => {return (<MenuItem key={Math.random()} value={carrera.id}>{carrera.nombre}</MenuItem>) })
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
                      disabled
                      onChange={() => {}}                  
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
                      disabled
                      onChange={() => {}}                  
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
                    sursoObject((prevValue) => { return {...prevValue, fecha_desde: fechaDesde}})
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
                  value={cursoObject.cupo_maximo}
                  type={"number"}
                  error={cursoObject.cupo_maximo === "" ? true : false}
                  variant="outlined" 
                  onChange={(e) => {
                    const cupoMaximo = String(e.currentTarget.value);
                    sursoObject((prevValue) => { return {...prevValue, cupo_maximo: cupoMaximo}})
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
              onClick={updateCurso}
            >Actualizar</Button>
          </CardActions>
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
