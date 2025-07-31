import dotenv from 'dotenv';
dotenv.config();

const queryMigrateFiles = `
    USE ${process.env.DB_NAME};
    
    insert into expedientes (idDocente, idCentro, idUnidad, idCarrera, no_ingreso, idTipoDoc,
        idPromo, usuario_creo, usuario_modifico, fecha_crea, fecha_modifica, estado)
    select idDocente, '', '', '', idDocente, 0, 0, '',
           '', now(), now(), ''
    from docentes_temp;
`;

export default queryMigrateFiles;