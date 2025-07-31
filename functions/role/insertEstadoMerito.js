const queryInsertEstadoMerito = `
    USE ${process.env.DB_NAME};

    insert into estado_meritos (fecha_creacion, fecha_presentado, fecha_modificacion, nota_total, idUsuario,
        idUnidadAcademica, idEstado, deleted_at, idAnho)
    select distinct NOW(), null, NOW(), 0.000,
                    IF(ur.idRol in (2, 3), ur.idUsuario, null),
                uau.idUnidadAcademica,
                3, null, (
                    select idAnho from anho_meritos where idEstado = 8
                ) idAnho
    from usuario_has_rol ur
             inner join unidad_academica_has_usuario uau on ur.idUsuario = uau.idUsuario
    where idUnidadAcademica in (?) and uau.idUsuario > 11;
`;

export default queryInsertEstadoMerito;