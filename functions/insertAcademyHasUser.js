require('dotenv').config();

const queryInsertAcademy = `
    USE ${process.env.DB_NAME};
    
    -- Create of temporal for code dependency
    DROP TABLE IF EXISTS temp_code_dependency;
    CREATE TABLE IF NOT EXISTS temp_code_dependency (
        csv int,
        db int
    );
    
    LOAD DATA LOCAL
    INFILE '/tmp/view_code_dependency.csv' INTO TABLE temp_code_dependency
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (csv, db);
    
    -- Insert user with correct ID
    insert into unidad_academica_has_usuario (idUnidadAcademicaUsuario, descripcion,
        fecha_creacion, fecha_modificacion, idEstado, idUnidadAcademica, idUsuario, deleted_at)
    select null, DEPENDENCIA, CURDATE(),
           CURDATE(), 1,
           ua.idUnidadAcademica, u.idUsuario, null
    from Temp
    inner join usuario u on u.reg_tra COLLATE utf8mb4_0900_ai_ci = Temp.REGISTRO
    inner join temp_code_dependency tcd on tcd.csv = Temp.CODIGO
    inner join unidad_academica ua on ua.idUnidadAcademica = tcd.db
    where ua.idUnidadAcademica in (?);
`;

module.exports = queryInsertAcademy;