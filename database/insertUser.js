require('dotenv').config();

const queryInsertUser = `
    USE ${process.env.DB_NAME};
    
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
`;

module.exports = queryInsertUser;