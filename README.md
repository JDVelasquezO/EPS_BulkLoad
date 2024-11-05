# Pre-requirements
- curl > 7.81.0
- node > 20.18.0

# Start server
```npm install```

```npm start```

# Static files
```sudo cp ./BulkLoadServer/res/PROFESORES.csv /var/lib/mysql-files```

```sudo cp ./BulkLoadServer/res/view_code_dependency.csv /var/lib/mysql-files```

# Configure static files
`mysql> show global variables like 'local_infile';`
`mysql> SET GLOBAL local_infile=true;`
`mysql> quit`

# Endpoints
| Método | Endpoint          | Puerto | Descripción                                                                                        | Body                           |
|--------|-------------------|--------|----------------------------------------------------------------------------------------------------|--------------------------------|
| GET    | /bulkLoadUser     | 3001   | Carga los datos del archivo CSV a una tabla temporal en la base de datos.                          |                                |
| GET    | /cleanData        | 3001   | Limpia los datos eliminando registros duplicados, filas vacías y arregla correos electrónicos.     |                                |
| GET    | /insertUser       | 3001   | Inserta los datos de la tabla temporal a la tabla usuario.                                         |                                |
| POST   | /insertAcademy    | 3001   | Inserta los datos de academia junto con el id de usuario enviando un arreglo de codigos de unidad. | `{"dependency": "[12,25,38]"}` |
| POST   | /insertDependency | 3001   | Inserta los datos de roles junto con el id de usuario enviando un arreglo de codigos de unidad..   | `{"dependency": "[12,25,38]"}` |
| GET    | /deleteDataUser   | 3001   | Elimina todo lo creado y modificado hasta ahora.                                                   |                                |

# Execution
## For get methods
- `curl http://localhost:3001/<endpoint>`

## For post methods
- `curl -X POST -H 'Content-Type: application/json' -d '{"dependency": "[n, m]"}' http://localhost:3001/<endpoint>`