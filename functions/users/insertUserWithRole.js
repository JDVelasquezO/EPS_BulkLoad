// {"users": "[39]", "role": "3"}'
require('dotenv').config();

const queryInsertUserWithRole = `
    USE ${process.env.DB_NAME};
    
    insert into usuario_has_rol (descripcion, fecha_creacion, fecha_modificacion, idUsuario,
        idRol, idEstado, deleted_at)
    select distinct concat(nombre, ' con rol especificado'), curdate(), curdate(),
           u.idUsuario, ?, 1, null
    from usuario u where idUsuario in (?) and u.idUsuario > 37;
`;

module.exports = queryInsertUserWithRole;