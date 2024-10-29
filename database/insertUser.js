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
`;

module.exports = queryInsertUser;