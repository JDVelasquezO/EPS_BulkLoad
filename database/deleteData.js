require('dotenv').config();

const queryDeleteDataUser = `
    USE ${process.env.DB_NAME};
    
    delete ignore from unidad_academica_has_usuario where idUnidadAcademicaUsuario > 278;
    delete ignore from usuario_has_rol where idUsuarioRol > 37;
    delete ignore from usuario where idUsuario > 35;
    drop table if exists Temp;
    drop table if exists temp_code_dependency;
`;

module.exports = queryDeleteDataUser;