drop procedure if exists reassign_users;

delimiter //
create procedure if not exists reassign_users(
    listUsers varchar(1000),
    idOriginUnity int,
    idDestinyUnity int,
    isDeleted bool
)
begin
    declare idArrayLocal varchar(1000);
    declare startPos smallint;
    declare commaPos smallint;
    declare currentId varchar(1000);
    declare endLoop tinyint;

    set idArrayLocal = listUsers;
    set startPos = 1;
    set commaPos = locate(',', idArrayLocal);

    repeat
        if commaPos > 0 then
            set currentId = substring(idArrayLocal, startPos, commaPos - startPos);
            set endLoop = 0;
        else
            set currentId = substring(idArrayLocal, startPos);
            set endLoop = 1;
        end if;

        # Aquí va lo que hace el id en juego
        # Si se debe actualizar totalmente el registro:
        if isDeleted then
            update unidad_academica_has_usuario set idUnidadAcademica = idDestinyUnity, descripcion = (
                select descripcion from unidad_academica ua where ua.idUnidadAcademica = idDestinyUnity
            )
            where idUsuario = currentId and idUnidadAcademica = idOriginUnity;
        # Si solo se va a agregar un nuevo registro:
        else
            insert into unidad_academica_has_usuario (descripcion, fecha_creacion, fecha_modificacion, idEstado,
                        idUnidadAcademica, idUsuario, deleted_at)
            select ua.descripcion, now(), now(), 1, idDestinyUnity, cast(currentId as unsigned), null
            from unidad_academica ua where idUnidadAcademica = idDestinyUnity;
        end if;

        if endLoop = 0 then
            set idArrayLocal = substring(idArrayLocal, commaPos + 1);
            set commaPos = locate(',', idArrayLocal);
        end if;
    until endLoop = 1
    end repeat;
end //
delimiter ;