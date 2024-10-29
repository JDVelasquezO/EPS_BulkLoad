const queryInsertUser = `
    USE dev_deppa;
    
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
    
    insert into unidad_academica_has_usuario (idUnidadAcademicaUsuario, descripcion,
        fecha_creacion, fecha_modificacion, idEstado, idUnidadAcademica, idUsuario, deleted_at)
    select null, DEPENDENCIA, CURDATE(),
           CURDATE(), 1,
           ua.idUnidadAcademica, u.idUsuario, null
    from Temp
    inner join usuario u on u.reg_tra COLLATE utf8mb4_0900_ai_ci = Temp.REGISTRO
    inner join unidad_academica ua on LOWER(ua.nombre) COLLATE utf8mb4_0900_ai_ci = LOWER(Temp.DEPENDENCIA);
`;

module.exports = queryInsertUser;