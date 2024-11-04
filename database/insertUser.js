const queryInsertUser = `
    USE dev_deppa;
    
    -- Reset old users
    update usuario set usuario = '19160647' where usuario = '20160647';
    update usuario set reg_tra = '19160647' where usuario = '19160647';
    
    -- Password test
    insert into usuario (idUsuario, nombre, apellido, contrasenha, correo, usuario, reg_tra, fecha_nacimiento,
                         cui, genero, fecha_creacion, fecha_modificacion, idEstado, deleted_at)
    select distinct NULL,
                    TRIM(',' FROM SUBSTRING_INDEX(NOMBRE_COMPLETO, ' ', 2)),
                    TRIM(',' FROM SUBSTRING_INDEX(NOMBRE_COMPLETO, ' ', -2)),
                    '$2y$10$C4I7IdMGIEs/NxCGsXnd9.4/mD7xCLKprujmOoAz2c8jN5AZ0kbfq',
                    EMAIL,
                    REGISTRO,
                    REGISTRO, STR_TO_DATE(FECHA_NAC, '%m/%d/%Y'),
                    CUI, '', CURDATE(), CURDATE(), 1,
                    null
    from Temp;
    
    -- Create of temporal for code dependency
    DROP TABLE IF EXISTS temp_code_dependency;
    CREATE TABLE IF NOT EXISTS temp_code_dependency (
        csv int,
        db int
    );
    
    LOAD DATA
    INFILE '/var/lib/mysql-files/view_code_dependency.csv' INTO TABLE temp_code_dependency
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
    inner join unidad_academica ua on ua.idUnidadAcademica = tcd.db;
    
    -- Insert user with correct rol
    insert into usuario_has_rol (descripcion, fecha_creacion, fecha_modificacion, idUsuario, idRol, idEstado, deleted_at)
    select distinct concat(nombre, ' con rol de docente'), curdate(), curdate(),
           idUsuario, 3, 1, null
    from usuario;
`;

module.exports = queryInsertUser;