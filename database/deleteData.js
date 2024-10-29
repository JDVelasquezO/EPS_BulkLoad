const queryDeleteDataUser = `
    USE dev_deppa;
    
    delete from unidad_academica_has_usuario where idUnidadAcademicaUsuario > 278;
    delete from usuario where idUsuario > 35;
    drop table Temp;
`;

module.exports = queryDeleteDataUser;