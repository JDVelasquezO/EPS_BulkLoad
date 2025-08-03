import dotenv from 'dotenv';
dotenv.config();

const queryInsertReqPromotion = `
    USE ${process.env.DB_NAME};
    
    insert into solicitud_promocion (no_oficio, no_ingreso, url_expediente,
        url_cuadro_promocion, url_sancion, observaciones_extra, observaciones_comeval,
        is_cuadro_terminado, fecha_creacion, fecha_modificacion, deleted_at, idDocente, 
        idEstado, idUnidadAcademica, idUsuarioCreador, idUsuarioModificador, idTipoPromocion)
    select '', ?, '', '', '',
           '', '', true, now(),
           now(), now(), ?, ?, ?, 1, 1, ?;
`;

export default queryInsertReqPromotion