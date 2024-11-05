# Start server
```npm install```

```npm start```

# Static files
```sudo cp ./BulkLoadServer/res/PROFESORES.csv /var/lib/mysql-files```

```sudo cp ./BulkLoadServer/res/view_code_dependency.csv /var/lib/mysql-files```

# Endpoints
| Método | Endpoint          | Puerto | Descripción                                                                                    | Body                         |
|--------|-------------------|--------|------------------------------------------------------------------------------------------------|------------------------------|
| GET    | /bulkLoadUser     | 3001   | Carga los datos del archivo CSV a una tabla temporal en la base de datos.                      | --------                     |
| GET    | /cleanData        | 3001   | Limpia los datos eliminando registros duplicados, filas vacías y arregla correos electrónicos. | --------                     |
| GET    | /insertUser       | 3001   | Inserta los datos de la tabla temporal a la tabla usuario.                                     | --------                     |
| GET    | /deleteDataUser   | 3001   | Elimina todo lo creado y modificado hasta ahora.                                               | --------                     |
| POST   | /insertDependency | 3001   | Elimina todo lo creado y modificado hasta ahora.                                               | {"dependency": "[12,25,38]"} |
