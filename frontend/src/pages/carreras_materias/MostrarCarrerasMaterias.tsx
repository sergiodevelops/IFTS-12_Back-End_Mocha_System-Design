import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, TextField, FormControl, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@material-ui/core";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TimerIcon from '@material-ui/icons/Timer';
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import store from '../../store/store';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import CarreraService from "../../services/CarreraService";

export default function MostrarCarrerasMaterias() {
  const carreraService = new CarreraService();

  const classes = useStyles();

  const { carreraId } = useParams();
  
  const [carreraObject, setCarreraObject] = useState({nombre: "", carreras_materias: []});

  useEffect(() => {
    loadCarrera();
  }, []);

  const loadCarrera = async() => {
    const result = await carreraService.read(carreraId)
    .catch(error => console.log(error));

    if (!result) {
        store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Carrera inexistente')));
        window.location.href = '/#/itm/carreras';
        return;
    }
    
    const carrerasMateriasCollection = result.model.carreras_materias.filter((carrera_materia: any) => carrera_materia.estado === 'activo');
    result.model.carreras_materias = carrerasMateriasCollection;

    setCarreraObject(result.model);
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <h2 className={classes.fontTitle}>
              Listado de la Carrera con Materias
            </h2>
            <form noValidate autoComplete="off" style={{marginTop: 40}}>
              <h4 className={classes.fontTitle}>
                Carrera
              </h4>
              <TextField 
                id="carrera-nombre" 
                label="Nombre de la carrera"
                required
                variant="filled"
                value={carreraObject.nombre}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Divider style={{marginTop: 20}} />
              <Grid container>
                <Grid item xs={12}>
                  <FormControl style={{marginTop: 20}}>
                    <h4 className={classes.fontTitle}>
                    { carreraObject.carreras_materias.length !== 0 ? "Materias" : "Sin materias cargadas" }
                    </h4>
                  </FormControl>            
                </Grid>
                <Grid item xs={12}>
                  <List dense={true}>                      
                  {
                    carreraObject.carreras_materias.map((carrera_materia: any, index) => {
                      return (
                        <Grid 
                          key={Math.random()}
                          item xs={4}
                          style={{float: 'left', marginRight: 10, borderRight: "1px solid #9999", borderBottom: "1px solid #9999", marginTop: 20}}
                        >          
                          <ListItem style={{width: 300, height: 100}}>
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
                                    style={{textTransform: 'uppercase', fontWeight: "bolder"}}
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
                                    style={{textTransform: 'uppercase', fontWeight: "bolder"}}
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
            </form>
          </CardContent>          
        </Card>
        </Grid>        
      </Grid>
    </div>
  );
}
