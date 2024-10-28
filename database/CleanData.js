const queryCleanUser = `
    USE dev_deppa;
    
    delete from Temp where Temp.REGISTRO = 'REGISTRO';
    
    delete from Temp where Temp.CUI in (
        select t.CUI from
            (select *, row_number() over (
                partition by Temp.REGISTRO, Temp.CUI order by Temp.REGISTRO, Temp.CUI
            ) as number
            from Temp) t
        where number > 1
    );
`;

module.exports = queryCleanUser;