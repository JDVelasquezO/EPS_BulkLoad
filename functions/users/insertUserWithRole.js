// {"users": "[39]", "role": "3"}'
import dotenv from 'dotenv';
dotenv.config();

const queryInsertUserWithRole = `
    USE ${process.env.DB_NAME};
    
    insert into usuario_has_rol (descripcion, fecha_creacion, fecha_modificacion, idUsuario,
        idRol, idEstado, deleted_at)
    select distinct concat(nombre, ' con rol especificado'), NOW(), NOW(),
           u.idUsuario, ?, 1, null
    from usuario u
    where u.idUsuario in (?) and u.idUsuario > 11 and not exists(
        select null
        from usuario_has_rol uhr
        where uhr.idUsuario = u.idUsuario
    );
`;

export default queryInsertUserWithRole;