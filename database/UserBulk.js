const queryUserBulk = `
    USE dev_deppa;
    
    DROP TABLE Temp;
    
    CREATE TABLE IF NOT EXISTS Temp (
        Nombre varchar(50),
        Apellido varchar(50)
    );
    
    LOAD DATA
    INFILE '/var/lib/mysql-files/FILE.csv' INTO TABLE Temp
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (Nombre, Apellido)`;

module.exports = queryUserBulk;