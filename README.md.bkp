------------------------------------
# system-design_IFTS12
----------- integrantes -------------
- Danlois
- Sandra
- Sergio

- [Sintaxis elegante para esta documentación](https://docs.github.com/es/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [Repositorio en GITHUB](https://github.com/sergioarieljuarez/system-design-ifts12)

![alt text](./docs/despegue_ifts12.jpeg)


------------------------------------
<a name="item1"></a>
# PASOS BASICOS TRABAJO EN EQUIPO CON GITHUB**

RELACION DE RAMAS
dev ---> hacer-api (hacer-api nace de dev)
<a name="step1"></a>
## 1. SUBIS TU TRABAJO TERMINADO A TU PROPIA RAMA INDIVIDUAL
```
# YA terminaste tu funcionalidad en tu rama individual "hacer-api"
git push origin hacer-api
```
## 2. TE PASAS A DEV
```
# YA terminaste tu funcionalidad en tu rama individual "hacer-api"
git checkout dev (te pasas a dev)
```
## 3. TE BAJAS LO ULTIMO QUE EXISTE en "dev" de la nube github a tu local
```
# actualizas tu dev local (el de tu pc)
git pull origin dev 
```
## 4. TE PASAS DE NUEVO A TU RAMA local
```
# actualizas tu dev local (el de tu pc)
git checkout hacer-api
```
## 5. ACTUALIZAS TU RAMA con lo que ahora tiene DEV
```
# Estoy parado en hacer-api (porque otra persona pudo haber ya mergeado sus cambios en el dev de la nube)
# mergeo con dev local
git merge dev 
```
### 5A. MERGE RESULTO "SIN CONFLICTOS" 
```
# puede estar todo OK sin conflictos (MERGE automatico o SIN CAMBIOS), pasar directo a paso 6:
```
[Link a PASO 6](#6.-SUBIR-ESTE-MERGE-LOCAL)
### 5B. MERGE RESULTO "CON CONFLICTOS"
```
# se pueden producir conflictos (MERGE que requiere resolver conflictos locales)
# ejemplo como se ven los conflictos:
**>>>>>>> HEAD (hacer-api)**
editar el codigo dejando lo que debería estar y...
**=======**
editar el codigo dejando lo que debería estar y...
git add .
**<<<<<<< DEV**
# edita todos los conflictos
# deberas corregirlos en cada archivo afectado, 
# luego hacer "add" 
git add <ficheros modificados y/o agregados>
# luego "commit" de esos arreglos o cambios
git commit -m "comentarios sobre lo resuelto, modificado y/o agregado"
# y continuar al paso 6...
```

## 6. SUBIR ESTE MERGE LOCAL
```
# ("hacer-api" <-- "dev") a la rama de trabajo "hacer-api" que esta en GitHub
# actualizas tu dev local (el de tu pc)
git push origin hacer-api
```


------------------------------------
### Comandos útiles durante el desarrollo:
1. Ver logs del contenedor que desee y que esté corriendo en Docker:
```
# Listar contenedores que estan corriendo actualmente en Docker, ejecute:
docker ps

# Puede ver logs del contenedor desado, ejecute:
docker logs --tail 100 -f ${NOMBRE_CONTENEDOR} 

# NOMBRE_CONTENEDOR puede ser una de las siguientes opciones: 
# ["mysql_service", "admindb_service", "api_service", "web_service"]
# Ejemplo:
docker logs --tail 100 -f api_service

# Finaliza el monitor de este proceso combinando las teclas "CTRL + C"
```
2. Cómo iniciar todos los servicios juntos (orquestar) para modo DESARROLLO (dev):
```
# pararse en el directorio raiz del proyecto, y ejecute:
# en forma abreviada (docker-compose.yml es el nombre "default"):
docker-compose up --build
# o en forma completa (especifica el nombre de archivo con "-f"):
docker-compose up --build -f docker-compose.yml
```
3. Cómo iniciar todos los servicios juntos (orquestar) para modo PRODUCCION (prod):
```
# pararse en el directorio raiz del proyecto (ej: E:/web-project/rrhh), y ejecute:
docker-compose -f docker-compose_prod.yml up --build
```
4. Cómo iniciar cada servicio por separado con docker (si ya fue iniciado anteriormente con compose):
   service 1 --> "db_backend_sd" (directorio es "backend")
   service 2 --> "api_backend_sd" (directorio es "backend")
   service 3 --> "web_frontend_sd" (directorio es "frontend")
```
# pararse en el directorio correspondiente, ejecute:
cd ./<directorio> # ej: cd backend
# para iniciar el servicio manualmente con "docker", ejecute:
docker start <service> # ej: docker start db_backend_sd
# para iniciar el servicio manualmente con "docker-compose", ejecute:
docker-compose up --build
```
5. Cómo iniciar cada servicio por separado con comando YARN para modo DESARROLLO (dev):
   service 1 --> "db_backend_sd" (directorio es "backend")
   service 2 --> "api_backend_sd" (directorio es "backend")
   service 3 --> "web_frontend_sd" (directorio es "frontend")
```
# pararse en el directorio correspondiente, en linux ejecute:
cd ./<directorio>/ 
yarn && yarn dev
```

------------------------------------
**FINALMENTE ir a GITHUB y...**
(solicitar que tus cambios sean integrados a la rama principal) === PULL REQUEST
solicitar pull-request de tu rama hacia donde nacio:
  dev <-- hacer-api (tu trabajo "hacer-api" se integraría a la rama principal compartida "dev")

YO GENERO UN CONFLICTO PORQUE VOY A MERGEAR ANTES QUE DANLOIS
