require('dotenv').config();

const queryMigrateTeacher = `
    USE ${process.env.DB_NAME};
    
    create table if not exists dev_deppa.docentes_temp
    (
        idDocente          int unsigned primary key,
        usuario_creo       varchar(150) not null,
        usuario_modifico   varchar(150) null,
        fecha_crea         datetime     not null,
        fecha_modifica     datetime     null,
        estado             varchar(50)  not null,
        titularidad        int unsigned not null,
        gradoDocente       int unsigned not null,
        constraint docentes_iddocente_unique
            unique (idDocente)
    )
        collate = utf8mb4_unicode_ci;
    
    insert into docentes_temp (idDocente, usuario_creo, usuario_modifico, fecha_crea, fecha_modifica, estado, titularidad, gradoDocente)
    select u.idUsuario, '', '', now(), now(), '', 0, 0
    from usuario u
    inner join usuario_has_rol uhr on u.idUsuario = uhr.idUsuario
    where uhr.idRol = 3;
`;

module.exports = queryMigrateTeacher;