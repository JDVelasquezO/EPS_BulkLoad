alter table unidad_academica_has_usuario
drop primary key,
add constraint pk_idUsuaro_idUnidadAcademica primary key (idUsuario, idUnidadAcademica);

alter table usuario_has_rol
drop primary key,
add constraint pk_idUsuario_idRol primary key (idUsuario, idRol);

alter table estado_meritos
drop primary key,
add constraint pk_idUsuario_idAnhio primary key (idUsuario, idUnidadAcademica, idAnho);