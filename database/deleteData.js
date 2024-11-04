const queryDeleteDataUser = `
    USE dev_deppa;
    
    delete from unidad_academica_has_usuario where idUnidadAcademicaUsuario > 278;
    delete from usuario_has_rol where idUsuarioRol > 37;
    delete from usuario where idUsuario > 35;
    drop table Temp;
    drop table temp_code_dependency;
`;

module.exports = queryDeleteDataUser;