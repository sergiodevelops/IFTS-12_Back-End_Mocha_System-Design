import React from "react";
import useStyles from "./styles";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Notifier from "../../components/Notifier/Notifier";
import Dashboard from "../../pages/dashboard/Dashboard";
import store from "../../store/store";
import ListadoMaterias from "../../pages/materias/ListadoMaterias";
import ListadoCarreras from "../../pages/carreras/ListadoCarreras";
import ListadoDocentes from "../../pages/docentes/ListadoDocentes";
import ListadoAlumnos from "../../pages/alumnos/ListadoAlumnos";
import AltaMaterias from "../../pages/materias/AltaMaterias";
import AltaCarreras from "../../pages/carreras/AltaCarreras";
import ModificacionCarreras from "../../pages/carreras/ModificacionCarreras";
import ModificacionMaterias from "../../pages/materias/ModificacionMaterias";
import AltaAlumnos from "../../pages/alumnos/AltaAlumnos";
import ModificacionAlumnos from "../../pages/alumnos/ModificacionAlumnos";
import AltaDocentes from "../../pages/docentes/AltaDocentes";
import ModificacionDocentes from "../../pages/docentes/ModificacionDocentes";
import AltaCarrerasMaterias from "../../pages/carreras_materias/AltaCarrerasMaterias";
import MostrarCarrerasMaterias from "../../pages/carreras_materias/MostrarCarrerasMaterias";
import AltaCorrelativas from "../../pages/correlativas/AltaCorrelativas";
import MostrarCorrelativas from "../../pages/correlativas/MostrarCorrelativas";
import ListadoCursos from "../../pages/cursos/ListadoCursos";
import AltaCursos from "../../pages/cursos/AltaCursos";
import ModificacionCursos from "../../pages/cursos/ModificacionCursos";
import ListadoCursosAlumnos from "../../pages/cursos_alumnos/ListadoCursosAlumnos";
import AltaCursosAlumnos from "../../pages/cursos_alumnos/AltaCursosAlumnos";
import AltaAsistencias from "../../pages/asistencias/AltaAsistencias";
import AltaEvaluaciones from "../../pages/evaluaciones/AltaEvaluaciones";
import AltaEvaluacionesFinales from "../../pages/evaluaciones/AltaEvaluacionesFinales";
import ListadoCarrerasMaterias from "../../pages/carreras_materias/ListadoCarrerasMaterias";

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <>
          <Header />                  
          <Sidebar />          
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: store.getState().layout.isSidebarOpened,
            })}
          >
            <div className={classes.extendToolbar} />
               
            <Notifier />

            <Switch>
              <Route path="/itm/dashboard" component={Dashboard} />
              <Route path="/itm/materias/alta" component={AltaMaterias} />
              <Route path="/itm/materias/:id" component={ModificacionMaterias} />
              <Route path="/itm/materias" component={ListadoMaterias} />
              <Route path="/itm/carreras/alta" component={AltaCarreras} />
              <Route path="/itm/carreras/:id" component={ModificacionCarreras} />
              <Route path="/itm/carreras" component={ListadoCarreras} />        
              <Route path="/itm/docentes/alta" component={AltaDocentes} />
              <Route path="/itm/docentes/:id" component={ModificacionDocentes} />
              <Route path="/itm/docentes" component={ListadoDocentes} />
              <Route path="/itm/alumnos/alta" component={AltaAlumnos} />
              <Route path="/itm/alumnos/:id" component={ModificacionAlumnos} />
              <Route path="/itm/alumnos" component={ListadoAlumnos} />
              <Route path="/itm/carreras_materias" exact component={ListadoCarrerasMaterias} />
              <Route path="/itm/carreras_materias/alta" exact component={AltaCarrerasMaterias} />
              {/* <Route path="/itm/carreras_materias/:carreraId/edit" exact component={AltaCarrerasMaterias} /> */}
              <Route path="/itm/carreras_materias/:carreraId" exact component={MostrarCarrerasMaterias} />              
              <Route path="/itm/correlativas/:carreraMateriaId/edit" exact component={AltaCorrelativas} />              
              <Route path="/itm/correlativas/:carreraMateriaId" exact component={MostrarCorrelativas} />                            
              <Route path="/itm/cursos/alta" exact component={AltaCursos} />                            
              <Route path="/itm/cursos/:id/edit" exact component={ModificacionCursos} />                            
              <Route path="/itm/cursos" exact component={ListadoCursos} />                
              <Route path="/itm/cursos_alumnos/alta" exact component={AltaCursosAlumnos} />                            
              <Route path="/itm/cursos_alumnos" exact component={ListadoCursosAlumnos} />                            
              <Route path="/itm/asistencias/:id" exact component={AltaAsistencias} />                            
              <Route path="/itm/evaluaciones/:id" exact component={AltaEvaluaciones} />                            
              <Route path="/itm/evaluacionesFinales/:id" exact component={AltaEvaluacionesFinales} />                            
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
