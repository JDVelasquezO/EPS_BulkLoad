require('dotenv').config();

const queryDeleteRoleByUnity = `
    USE ${process.env.DB_NAME};
    
    delete from usuario_has_rol where idUsuario in (
        select idUsuario from unidad_academica_has_usuario
        where idUnidadAcademica in (?)
    ) and idRol = ?;
`;

module.exports = queryDeleteRoleByUnity;