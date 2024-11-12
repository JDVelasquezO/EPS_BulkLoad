ALTER TABLE deppa_sistema.unidad_academica_has_usuario 
ADD CONSTRAINT unidad_academica_has_usuario_unique 
UNIQUE KEY (idUsuario,idUnidadAcademica);

ALTER TABLE deppa_sistema.usuario_has_rol 
ADD CONSTRAINT usuario_has_rol_unique
UNIQUE KEY (idUsuario,idRol);
