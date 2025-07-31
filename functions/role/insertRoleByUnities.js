import dotenv from 'dotenv';
dotenv.config();

const queryInsertRoleByUnity = `
    USE ${process.env.DB_NAME};
    
    insert into usuario_has_rol (descripcion, fecha_creacion, fecha_modificacion, idUsuario, 
        idRol, idEstado, deleted_at)
    select distinct concat(nombre, ' con rol especificado'), NOW(), NOW(),
           u.idUsuario, ?, 1, null
    from usuario u
    inner join unidad_academica_has_usuario uah on u.idUsuario = uah.idUsuario
    where uah.idUnidadAcademica in (?) and u.idUsuario > 11 and not exists(
        select null
        from usuario_has_rol uhr
        where uhr.idUsuario = uah.idUsuario
    );
`;

export default queryInsertRoleByUnity;