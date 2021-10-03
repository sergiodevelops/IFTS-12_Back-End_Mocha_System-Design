# system-design_IFTS12
system-design_IFTS12

- Danlois
- Sandra
- Sergio

# **PASOS BASICOS TRABAJO EN EQUIPO CON GITHUB**

RELACION DE RAMAS
dev ---> hacer-api (hacer-api nace de dev)

---------------------------------
YA terminaste tu funcionalidad en tu rama individual "hacer-api"
---------------------------------
**SUBIS TU TRABAJO TERMINADO A TU PROPIA RAMA INDIVIDUAL**
# git push origin hacer-api

---------------------------------
---------------------------------
"trabajamos en local para tener lo ultimo de github"
------------------
**TE PASAS A DEV**
# git checkout dev (te pasas a dev)
------------------
**TE BAJAS LO ULTIMO QUE EXISTE en "dev" de la nube a tu local**
# git pull origin dev (actualizas tu dev local)
------------------
**TE PASAS DE NUEVO A TU RAMA local**
# git checkout hacer-api
------------------
**ACTUALIZAS TU RAMA con lo que ahora tiene DEV**
Estoy parado en hacer-api
(porque otra persona pudo haber ya mergeado sus cambios en el dev de la nube)
# git merge dev (mergeo con dev local)

- puede estar todo OK sin conflictos (MERGE automatico)
- o se pueden producir conflictos (MERGE que requiere resolver conflictos locales)
  y deberas corregir, add y commit
---------
**- si esta todo OK hacer PUSH**
# git push origin hacer-api
---------
**- si hubo conflictos**
  editar el codigo dejando lo que debería estar y...

>>>>>>> HEAD (hacer-api)
editar el codigo dejando lo que debería estar y...
=======
editar el codigo dejando lo que debería estar y...
# git add .
<<<<<<< DEV

# git add .
# git commit -m "comentarios sobre lo resuelto"
# git push origin hacer-api

------------------
**FINALMENTE ir a GITHUB y...**
(solicitar que tus cambios sean integrados a la rama principal) === PULL REQUEST
solicitar pull-request de tu rama hacia donde nacio:
  dev <-- hacer-api (tu trabajo "hacer-api" se integraría a la rama principal compartida "dev")
