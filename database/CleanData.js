const queryCleanUser = `
    USE dev_deppa;
    
    delete from Temp where Nombre = '';
    
    delete from Temp where Id in (
        select t.Id from
            (select *, row_number() over (
                partition by Temp.Nombre, Temp.Apellido order by Temp.Nombre
            ) as number
        from Temp) t
        where number > 1
    );
`;

module.exports = queryCleanUser;