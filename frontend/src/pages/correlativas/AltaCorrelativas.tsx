import React, { useEffect, useState } from "react";
import { Grid, Card, Button, CardActions, CardContent, TextField, FormControl, FormControlLabel, Checkbox, Divider } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CorrelativaService from "../../services/CorrelativaService";
import CarreraMateriaService from "../../services/CarreraMateriaService";

export default function AltaCorrelativas() {
  const correlativaService = new CorrelativaService();
  const carreraMateriaService = new CarreraMateriaService();

  const classes = useStyles();

  const { carreraMateriaId } = useParams();

  const [carreraMateriaObject, setCarreraMateriaObject] = useState({ carrera: { nombre: "" }, materia: {id: "", nombre: "" }, correlativas_carreras_materias: [] });
  const [carreraMateriaCollection, setCarreraMateriaCollection] = useState([]);
  const [correlativasId, setCorrelativasId] = useState([]);

  useEffect(() => {
    loadCarreraMateria();
  }, []);

  const loadCarreraMateria = async () => {
    const result = await carreraMateriaService.read(carreraMateriaId)
      .catch((error: any) => console.log(error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carrera/Materia inexistente')));
      window.location.href = '/#/ifts/carreras_materias';
      return;
    }

    const correlativas = result.model.correlativas_carreras_materias.filter((carreraMateria: any) => carreraMateria.estado === 'activo');
    result.model.correlativas_carreras_materias = correlativas;

    setCorrelativasId(result.model.correlativas_carreras_materias.map((carrera_materia: any) => { return {correlativa_id: carrera_materia.id, carrera_materia_id: Number(carreraMateriaId)}}));
    setCarreraMateriaObject(result.model);

    loadMaterias(result.model.carrera_id, result.model.materia_id);
  }

  const loadMaterias = async (carreraId: number, materiaId: number) => {
    const result = await carreraMateriaService.listByQuery({carrera_id: carreraId})
      .catch((error: any) => console.log(error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Hubo un error al recuperar las materias')));
      window.location.href = '/#/ifts/carreras_materias';
      return;
    }

    const resultFilter = result.filter((carreraMateria: any) => carreraMateria.materia.id !== Number(materiaId));
    setCarreraMateriaCollection(resultFilter);
  }

  const handleChangeMaterias = (correlativa_id: number) => {
    setCorrelativasId((prevState: any) => {
      return prevState.findIndex((element: any) => element.correlativa_id === correlativa_id) !== -1 ? prevState.filter((materiaFiltered: any) => materiaFiltered.correlativa_id !== correlativa_id) : [...prevState, { correlativa_id: correlativa_id }];
    });
  }

  const saveCorrelativa = async () => {
    const correlativas = correlativasId.map((correlativa: any) => { return { correlativa_id: Number(correlativa.correlativa_id), carrera_materia_id: Number(carreraMateriaId) } });
    const result = await correlativaService.createBulk(carreraMateriaId, correlativas)
      .catch((error: Error) => {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', error.message)));
        return false;
      });

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Asociación de correlativas exitosa')));
      setTimeout(() => {
        window.location.href = '/#/ifts/carreras_materias';
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
                Asociación de Carrera/Materia con sus Correlativas
              </h2>
              <Grid container style={{ marginTop: 20 }}>
                <Grid item xs={2}>
                  <TextField
                    id="carrera-nombre"
                    label="Nombre de la carrera"
                    variant="filled"
                    value={carreraMateriaObject.carrera.nombre}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="materia-nombre"
                    label="Nombre de la materia"
                    variant="filled"
                    value={carreraMateriaObject.materia.nombre}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Divider style={{ marginTop: 20 }} />
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl style={{ marginTop: 20 }}>
                      <h4 className={classes.fontTitle}>
                        Correlativas
                    </h4>
                    </FormControl>
                  </Grid>
                  {
                    carreraMateriaCollection.map((carreraMateria: any, index) => {
                      return (
                        <Grid
                          key={Math.random()}
                          item xs={2}
                          style={{ float: 'left' }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event: any) => handleChangeMaterias(parseInt(event.target.value))}
                                key={index}
                                value={carreraMateria.id}
                                name={carreraMateria.materia.nombre}
                                color="primary"
                                checked={correlativasId.findIndex((element: any) => element.correlativa_id === carreraMateria.id) !== -1}
                              />
                            }
                            label={carreraMateria.materia.nombre}
                          />
                        </Grid>
                      );
                    })
                  }
                </Grid>                                                        
              </Grid>                                                        
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={saveCorrelativa}
              >Asociar Correlativas</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
