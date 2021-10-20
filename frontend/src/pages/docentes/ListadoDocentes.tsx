import moment from 'moment';
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import useStyles from "./styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { notifierActions } from "../../actions/allActions";
import Notification from '../../models/Notification';
import AlertDialog from '../../components/Dialogs/AlertDialog';
import store from "../../store/store";
import DocenteService from '../../services/DocenteService';

export default function ListadoDocentes() {
  const userLocalstorage: any = localStorage.getItem('user');
  const user = JSON.parse(userLocalstorage);
  const docenteService = new DocenteService();

  const classes = useStyles();
  
  const [docentesCollection, setDocentesCollection] = useState<[]>([]);
  const [deleteDocente, setDeleteDocente] = useState(0);

  useEffect(() => {
    listadoDocentes();
  }, []);

  const listadoDocentes = async () => {
    const result = await docenteService.list();
    setDocentesCollection(result);
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
      label: "Nombres",
      name: "nombres",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Apellido",
      name: "apellido",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Teléfono",
      name: "telefono",
      options: {
        filter: true,
        sort: true,
      },
    },
    {  
      label: "Celular",
      name: "celular",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Email",
      name: "email",
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
          const idDocente = tableMeta['rowData'][0];
          return (
            <div>              
              <Button
                variant="contained"
                color="primary"
                style={{color: 'white'}}
                startIcon={<EditIcon/>}
                size="medium"
                onClick={() => window.location.href = `/#/ifts/docentes/${idDocente}`}
              >Editar</Button>
              <Button
                variant="contained"
                color="secondary"
                style={{color: 'white', marginLeft: 20}}
                startIcon={<DeleteIcon/>}
                size="medium"
                onClick={() => {
                  setDeleteDocente(idDocente);
                }}
              >Eliminar</Button>
            </div> 
          );
        }
      }
    }
  ];

  const newDocente = () => {
    return (
      <span>
        <Button
          variant="contained"
          className={classes.buttonNewDocente}
          startIcon={<AddCircleIcon />}
          onClick={() => window.location.href = `/#/ifts/docentes/alta`}
        > 
        Nuevo Docente
        </Button>
      </span> 
    );
  };

  const handleState = (state: boolean) => {
    if (state) removeDocente(deleteDocente);

    setDeleteDocente(0);
  } 

  const removeDocente = async(id: number) => {
    const result = await docenteService.delete(id)
    .catch(error => console.log(error));

    if (result) {
      store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Eliminación del docente exitosa')));
      listadoDocentes();
    } else {
      store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'El docente no se puede eliminar ya que posee cursos activos')))
    }
  }

  const optionsDataTable: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    customToolbar: newDocente,
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable title={"Listado de docentes"} data={docentesCollection} columns={columns} options={optionsDataTable}/>
          { deleteDocente ? <AlertDialog handleState={handleState} title={"Eliminación de Docente"} text={"¿Está seguro que desea eliminar el docente seleccionado?"}></AlertDialog> : null }
        </Grid>        
      </Grid>
    </div>
  );
}
