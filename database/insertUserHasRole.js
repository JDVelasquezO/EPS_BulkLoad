require('dotenv').config();

const queryInsertDependency = `
    USE ${process.env.DB_NAME};
    
    -- Insert user with correct rol
    insert into usuario_has_rol (descripcion, fecha_creacion, fecha_modificacion, idUsuario, idRol, idEstado, deleted_at)
    select distinct concat(nombre, ' con rol de docente'), curdate(), curdate(),
           u.idUsuario, 3, 1, null
    from usuario u
    inner join unidad_academica_has_usuario uah on u.idUsuario = uah.idUsuario
    where uah.idUnidadAcademica in (?);
`;

module.exports = queryInsertDependency;