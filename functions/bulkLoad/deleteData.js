import dotenv from 'dotenv';
dotenv.config();

const queryDeleteDataUser = `
    USE ${process.env.DB_NAME};
    
    delete ignore from unidad_academica_has_usuario where idUnidadAcademicaUsuario > 42;
    delete ignore from usuario_has_rol where idUsuarioRol > 11;
    delete ignore from estado_meritos where idEstadoMeritos > 12;
    delete ignore from usuario where idUsuario > 11;
    drop table if exists Temp;
    drop table if exists temp_code_dependency;
`;

export default queryDeleteDataUser;