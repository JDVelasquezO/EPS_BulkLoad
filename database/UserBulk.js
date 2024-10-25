const queryUserBulk = `
    USE dev_deppa;
    
    DROP TABLE IF EXISTS Temp;
    
    CREATE TABLE IF NOT EXISTS Temp (
        Id int,
        Nombre varchar(50),
        Apellido varchar(50)
    );
    
    LOAD DATA
    INFILE '/var/lib/mysql-files/FILE.csv' INTO TABLE Temp
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (Id, Nombre, Apellido)`;

module.exports = queryUserBulk;