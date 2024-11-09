alter table usuario_has_rol
drop primary key,
add constraint pk_idUsuario_idRol primary key (idUsuario, idRol);
