const queryCleanUser = `
    USE dev_deppa;
    
    -- Elimina encabezado y registros vacíos
    delete from Temp where Temp.REGISTRO = 'REGISTRO' or Temp.REGISTRO = '';
    
    -- Elimina repetidos
    delete from Temp where Temp.CUI in (
        select t.CUI from
            (select *, row_number() over (
                partition by Temp.REGISTRO, Temp.CUI order by Temp.REGISTRO, Temp.CUI
            ) as number
            from Temp) t
        where number > 1
    );
    
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