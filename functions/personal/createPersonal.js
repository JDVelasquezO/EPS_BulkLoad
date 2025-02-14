require('dotenv').config();

const queryCreatePersonal = `
    USE ${process.env.DB_NAME};

    drop table if exists personal;

    create table if not exists personal(
        registro_personal varchar(100),
        nombre varchar(100),
        apellido varchar(100),
        sexo varchar(100),
        email varchar(100),
        telefono varchar(100),
        cui varchar(100),
        puesto varchar(100)
    );
`;

module.exports = queryCreatePersonal;