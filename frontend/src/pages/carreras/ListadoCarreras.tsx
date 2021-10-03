import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import PlusIcon from '@material-ui/icons/ControlPoint';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./styles";
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import CarreraService from "../../services/CarreraService";
import store from "../../store/store";

export default function ListadoCarreras() {
  const userLocalstorage: any = localStorage.getItem('user');
  const user = JSON.parse(userLocalstorage);
  const carreraService = new CarreraService();

  const classes = useStyles();
  
  const [carrerasCollection, setCarrerasCollection] = useState<[]>([]);
  const [deleteCarrera, setDeleteCarrera] = useState(0);

  useEffect(() => {
    listadoCarreras();
  }, []);

  const listadoCarreras = async () => {
    const result = await carreraService.list();
    setCarrerasCollection(result);
  };

  const columns = [
    {
      label: "Id",
      name: "id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Nombre",
      name: "nombre",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   label: "Estado",
    //   name: "estado",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   label: "Fecha Estado",
    //   name: "fecha_estado",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      label: "Fecha de creación",
      name: "createdAt",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
      },
    },
    {
      name: "Acciones",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value: string, tableMeta: any) => {    
          const idCarrera = tableMeta['rowData'][0];
          return (
            <div>
              {/* <Button
                variant="contained"
                color="primary"
                style={{color: 'white'}}
                startIcon={<VisibilityIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/itm/carreras_materias/${idCarrera}`}
              >Materias</Button>              
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<PlusIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/itm/carreras_materias/${idCarrera}/edit`}
              >Materias</Button>         */}
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<EditIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/itm/carreras/${idCarrera}`}
              >Editar</Button>
              <Button
                variant="contained"
                color="secondary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<DeleteIcon/>}
                size="medium"
                onClick={() => {
                  setDeleteCarrera(idCarrera);
                }}
              >Eliminar</Button>
            </div> 
          );
        }
      }
    }
  ];

  const newCarrera = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewCarrera}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/itm/carreras/alta`}
        > 
        Nueva Carrera
        </Button>
      </span> 
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeCarrera(deleteCarrera);

    setDeleteCarrera(0);
  } 

  const removeCarrera = async(id: number) => {
    const result = await carreraService.delete(id)
    .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación del carrera exitosa')));
      listadoCarreras();
    } else {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'La carrera no se puede eliminar ya que posee carreras/materias activas')))
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newCarrera,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de carreras"} data={carrerasCollection} columns={columns} options={optionsDataTable}/>
          { deleteCarrera ? <AlertDialog handleState={handleState} title={"Eliminación de Carrera"} text={"¿Está seguro que desea eliminar la carrera seleccionada?"}></AlertDialog> : null }
        </Grid>        
      </Grid>
    </div>
  );
}
