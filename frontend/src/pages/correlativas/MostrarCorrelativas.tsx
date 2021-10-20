import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, TextField, FormControl, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@material-ui/core";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TimerIcon from '@material-ui/icons/Timer';
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CarreraMateriaService from "../../services/CarreraMateriaService";

export default function MostrarCorrelativas() {
  const carreraMateriaService = new CarreraMateriaService();

  const classes = useStyles();

  const { carreraMateriaId } = useParams();

  const [carreraMateriaObject, setCarreraMateriaObject] = useState({ carrera: { nombre: "" }, materia: { nombre: "" }, correlativas_carreras_materias: [] });

  useEffect(() => {
    loadCarreraMateria();
  }, []);

  const loadCarreraMateria = async () => {
    const result = await carreraMateriaService.read(carreraMateriaId)
      .catch(error => console.log(error));

    if (!result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carrera/Materia inexistente')));
      window.location.href = '/#/ifts/carreras_materias';
      return;
    }

    const correlativas = result.model.correlativas_carreras_materias.filter((carreraMateria: any) => carreraMateria.estado === 'activo');
    result.model.correlativas_carreras_materias = correlativas;

    setCarreraMateriaObject(result.model);
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <h2 className={classes.fontTitle}>
                Listado de la Carrera/Materia con sus Correlativas
              </h2>   
              <Grid container style={{marginTop: 20}}>
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
                        {carreraMateriaObject.correlativas_carreras_materias.length !== 0 ? "Correlativas" : "Sin correlativas"}
                      </h4>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <List dense={true}>
                      {
                        carreraMateriaObject.correlativas_carreras_materias.map((carrera_materia: any, index) => {
                          return (
                            <Grid
                              key={Math.random()}
                              item xs={4}
                              style={{ float: 'left', marginRight: 10, borderRight: "1px solid #9999", borderBottom: "1px solid #9999"}}
                            >
                              <ListItem style={{ width: 300, height: 100 }}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <LibraryBooksIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <React.Fragment>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                        style={{ textTransform: 'uppercase', fontWeight: "bolder" }}
                                      >
                                        {carrera_materia.materia.nombre}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  secondary={"Nombre"}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <TimerIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <React.Fragment>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                        style={{ textTransform: 'uppercase', fontWeight: "bolder" }}
                                      >
                                        {carrera_materia.duracion}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                  secondary={"Duración"}
                                />
                              </ListItem>
                            </Grid>
                          );
                        })
                      }
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
