require('dotenv').config();

const queryCleanUser = `
    USE ${process.env.DB_NAME};
    
    -- Elimina encabezado y registros vacíos
    delete from Temp where Temp.REGISTRO = 'REGISTRO' or Temp.REGISTRO = '';
    
    -- Elimina repetidos
    create table temp_repeated as
        select distinct *
        from Temp;
    truncate table Temp;
    insert into Temp select * from temp_repeated;
    drop table temp_repeated;
    
    -- Actualiza correos repetidos
    update Temp set EMAIL = CONCAT(REGISTRO, EMAIL) where EMAIL in (
        select * from (
            select EMAIL from Temp
            group by EMAIL
            having EMAIL NOT LIKE '\r%' and COUNT(EMAIL) > 1
        ) as Email
    );
    
    -- Actualiza correos vacíos
    update Temp set EMAIL = CONCAT(REGISTRO, '@ingenieria.usac.edu.gt') where EMAIL like '\r%';
`;

module.exports = queryCleanUser;