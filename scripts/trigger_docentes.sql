# Insert into docente when usuario_has_rol has been inserted
delimiter $$

create trigger trigger_insert_teacher
    after insert on usuario_has_rol
    for each row
begin
    if NEW.idRol = 3 then
            insert into docentes_temp (idDocente, usuario_creo, usuario_modifico, fecha_crea, fecha_modifica,
                    estado, titularidad, gradoDocente)
    select u.idUsuario, '', '', now(), now(),
           '', 0, 0 from usuario u where u.idUsuario = NEW.idUsuario;
end if;
end$$

delimiter ;

# Insert into docente when usuario_has_rol has been updated
delimiter $$

create trigger trigger_update_teacher
    after update on usuario_has_rol
    for each row
begin
    if NEW.idRol = 3 and OLD.idRol <> 3 then
        insert into docentes_temp (idDocente, usuario_creo, usuario_modifico, fecha_crea, fecha_modifica,
                                   estado, titularidad, gradoDocente)
    select u.idUsuario, '', '', now(), now(),
           '', 0, 0 from usuario u where u.idUsuario = NEW.idUsuario;
end if;
end$$

delimiter ;