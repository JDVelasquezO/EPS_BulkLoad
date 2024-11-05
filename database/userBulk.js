const queryUserBulk = `
    USE dev_deppa;
    
    DROP TABLE IF EXISTS Temp;
    
    CREATE TABLE IF NOT EXISTS Temp (
        REGISTRO varchar(20),
        CUI varchar(20),
        NOMBRE_COMPLETO varchar(70),
        FECHA_NAC varchar(20),
        CODIGO varchar(20),
        DEPENDENCIA varchar(80),
        EMAIL varchar(80)
    );
    
    LOAD DATA
    INFILE '/var/lib/mysql-files/PROFESORES.csv' INTO TABLE Temp
    CHARACTER SET latin1
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (REGISTRO, CUI, NOMBRE_COMPLETO, FECHA_NAC, CODIGO, DEPENDENCIA, EMAIL)`;

module.exports = queryUserBulk;