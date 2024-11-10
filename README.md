# Pre-requirements
- curl > 7.81.0
- node > 20.18.0

# Static files must be in folder `/tmp`

# Configure static files
`UPDATE mysql.user SET Super_Priv='Y' WHERE user='deppa_user' AND host='%';`

`show global variables like 'local_infile';`

`SET GLOBAL local_infile=true;`

# Start server
```npm install```

```npm start```

# Endpoints
| Método | Endpoint               | Puerto | Descripción                                                                                        | Body                                        |
|--------|------------------------|--------|----------------------------------------------------------------------------------------------------|---------------------------------------------|
| GET    | `/bulkLoadUser`        | 3001   | Carga los datos del archivo CSV a una tabla temporal en la base de datos.                          |                                             |
| GET    | `/cleanData`           | 3001   | Limpia los datos eliminando registros duplicados, filas vacías y arregla correos electrónicos.     |                                             |
| GET    | `/insertUser`          | 3001   | Inserta los datos de la tabla temporal a la tabla usuario.                                         |                                             |
| POST   | `/insertAcademy`       | 3001   | Inserta los datos de academia junto con el id de usuario enviando un arreglo de codigos de unidad. | `{"dependency": "[12,25,38]"}`              |
| POST   | `/insertDependency`    | 3001   | Inserta los datos de roles junto con el id de usuario enviando un arreglo de codigos de unidad..   | `{"dependency": "[12,25,38]"}`              |
| GET    | `/deleteDataUser`      | 3001   | Elimina todo lo creado y modificado hasta ahora.                                                   |                                             |
| POST   | `/insertRoleByAcademy` | 3001   | Inserta roles específicos de unidades específicas.                                                 | `{"dependency": "[12,25,38]", "role": "3"}` |
| POST   | `/deleteRoleByAcademy` | 3001   | Elimina roles específicos de unidades específicas.                                                 | `{"dependency": "[12,25,38]", "role": "3"}` |
| POST   | `/insertUserWithRole`  | 3001   | Inserta roles específicos de usuarios específicas.                                                 | `{"users": "[32800, 32801]", "role": "3"}`  |

# Execution
## For get methods
- `curl http://localhost:3001/<endpoint>`

## For post methods
- `curl -X POST -H 'Content-Type: application/json' -d '{"dependency": "[n, m]"}' http://localhost:3001/<endpoint>`