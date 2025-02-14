# Bulk Load and ETL process for DEPPA - by [JDVelasquezO](https://github.com/JDVelasquezO)
## Index
### [Pre-requeriments](#pre-requirements)
### [Configuration](#Configure-static-files)
### [Start server](#Start-server)
### [Endpoints](#Endpoints)
### [Execution](#Execution)
### [Procedure methods](#procedure-methods)
### &nbsp;- [reassignUsers()](#reassignUsers)

## Pre-requirements
- curl > 7.81.0
- node > 20.18.0
- static files must be in folder `/tmp`

## Configure static files
```mysql
UPDATE mysql.user SET Super_Priv='Y' WHERE user='deppa_user' AND host='%';
show global variables like 'local_infile';
SET GLOBAL local_infile=true;
```

## Start server
```npm install```

```npm start```

## Endpoints
| Método | Endpoint               | Puerto | Descripción                                                                                        | Body                                                                            |
|--------|------------------------|--------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| GET    | `/bulkLoadUser`        | 3001   | Carga los datos del archivo CSV a una tabla temporal en la base de datos.                          |                                                                                 |
| GET    | `/cleanData`           | 3001   | Limpia los datos eliminando registros duplicados, filas vacías y arregla correos electrónicos.     |                                                                                 |
| GET    | `/insertUser`          | 3001   | Inserta los datos de la tabla temporal a la tabla usuario.                                         |                                                                                 |
| POST   | `/insertAcademy`       | 3001   | Inserta los datos de academia junto con el id de usuario enviando un arreglo de codigos de unidad. | `{"dependency": "[12,25,38]"}`                                                  |
| POST   | `/insertUserRol`       | 3001   | Inserta los datos de roles junto con el id de usuario enviando un arreglo de codigos de unidad..   | `{"dependency": "[12,25,38]"}`                                                  |
| GET    | `/deleteDataUser`      | 3001   | Elimina todo lo creado y modificado hasta ahora.                                                   |                                                                                 |
| POST   | `/insertRoleByAcademy` | 3001   | Inserta roles específicos de unidades específicas.                                                 | `{"dependency": "[12,25,38]", "role": "3"}`                                     |
| POST   | `/deleteRoleByAcademy` | 3001   | Elimina roles específicos de unidades específicas.                                                 | `{"dependency": "[12,25,38]", "role": "3"}`                                     |
| GET    | `/insertPersonal`      | 3001   | Inserta los registros del archivo `/res/personal_202502101232-0304.sql`.                           |                                                                                 |
| PUT    | `/updatePersonal`      | 3001   | Actualiza los campos de sexo o email pasando de parámetro el registro_personal.                    | `{"personal": "20190105", "email": "dayavi123@gmail.com", "sexo": "Masculino"}` |

## Execution
### For get methods
```shell
curl http://localhost:3001/<endpoint>
```

### For post methods
```shell
curl -X POST -H 'Content-Type: application/json' -d '{"dependency": "[n, m]"}' http://localhost:3001/<endpoint>
```

## Procedure methods
### *reassignUsers()*
#### Path: `./scripts/proc_reassignUsers.sql`
Este método obtiene un listado de idUsuario en tipo varchar separados por coma, así mismo el idUnidadAcademica de origen, idUnidadAcademica de destino y una bandera para indicar si este registro será una actualización del ya existente o una agregación a la tabla **unidad_academica_has_usuario**.<br />
Para ejectuar este método debemos llamarlo de la siguiente manera:

### Agregación
```mysql
# Este método obtendrá a los usuarios con id 15, 16 y 17 que pertenecen a la unidad 34 y los agregará como nuevo registro a la unidad 10
call reassign_users('15,16,17', 34, 10, false)
```

### Actualización
```mysql
# Este método obtendrá a los usuarios con id 15, 16 y 17 que pertenecen a la unidad 34 y los reemplazará de la unidad 34 a la unidad 10 sin agregar registro nuevo
call reassign_users('15,16,17', 34, 10, true)
```