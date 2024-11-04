# Start server
```npm install```

```npm start```

# Static files
```sudo cp ./BulkLoadServer/res/PROFESORES.csv /var/lib/mysql-files```

```sudo cp ./BulkLoadServer/res/view_code_dependency.csv /var/lib/mysql-files```

# Endpoints
| Método | Endpoint        | Puerto | Descripción                                                                                    |   |
|--------|-----------------|--------|------------------------------------------------------------------------------------------------|---|
| GET    | /bulkLoadUser   | 3001   | Carga los datos del archivo CSV a una tabla temporal en la base de datos.                      |   |
| GET    | /cleanData      | 3001   | Limpia los datos eliminando registros duplicados, filas vacías y arregla correos electrónicos. |   |
| GET    | /insertUser     | 3001   | Inserta los datos de la tabla temporal a la tabla usuario.                                     |   |
| GET    | /deleteDataUser | 3001   | Elimina todo lo creado y modificado hasta ahora.                                               |   |

# Resultados
1. **bulkLoadUser**

![image](https://hackmd.io/_uploads/HyEpSTHW1g.png)

![image](https://hackmd.io/_uploads/rJsPSaBZkx.png)

Obtenemos la tabla temporal literalmente del archivo CSV.

3. **cleanData**

![image](https://hackmd.io/_uploads/SkJJL6rZ1e.png)

![image](https://hackmd.io/_uploads/Bk_xUTr-ye.png)

Obtenemos la tabla temporal limpia sin registros duplicados ni filas vacías.

4. **insertUser**

![image](https://hackmd.io/_uploads/BJE4ITBWyg.png)

![image](https://hackmd.io/_uploads/SJXv8pSWye.png)

Tabla usuario llena con los datos del CSV

![image](https://hackmd.io/_uploads/BkHcI6BbJg.png)

Tabla unidad_academica_has_usuario con los datos de una tabla temporal haciendo referencia a los códigos de las unidades académicas.

![image](https://hackmd.io/_uploads/ry-RUaH-kl.png)

Tabla usuario_has_rol con los usuarios establecidos en rol docente.
