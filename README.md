# Start server
```npm install```

```npm start```

# Endpoints
| Método | Endpoint      | Puerto | Descripción                                                                                    |   |
|--------|---------------|--------|------------------------------------------------------------------------------------------------|---|
| GET    | /bulkLoadUser | 3001   | Carga los datos del archivo CSV a una tabla temporal en la base de datos.                      |   |
| GET    | /cleanData    | 3001   | Limpia los datos eliminando registros duplicados, filas vacías y arregla correos electrónicos. |   |
| GET    | /insertUser   | 3001   | Inserta los datos de la tabla temporal a la tabla usuario.                                     |   |