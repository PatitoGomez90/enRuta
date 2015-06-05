var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getModelom2ById: getModelom2ById,
	update: update,
	del: del
}

function getAll(id, cb){
	conn("select modelo_m2.*, tipotarea.descripcion as tipotareatxt from modelo_m2 left join tipotarea on tipotarea.id = modelo_m2.id_tipotarea_fk where id_modelom1_fk ="+id, cb);
}

function insert(idm1, tipotareaid, descripcion, cambiorevision, idrep1, cant1, idrep2, cant2, idrep3, cant3, idrep4, cant4, idrep5, cant5, cb){
	conn("insert into modelo_m2(`id_tipotarea_fk`, `descripcion`, `id_rep1_fk`, `id_rep2_fk`, `id_rep3_fk`, `id_rep4_fk`, `id_rep5_fk`, `cant1`, `cant2`, `cant3`, `cant4`, `cant5`, `cambio_revision`, `id_modelom1_fk`) values("+tipotareaid+", '"+descripcion+"', "+idrep1+", "+idrep2+", "+idrep3+", "+idrep4+", "+idrep5+", "+cant1+", "+cant2+", "+cant3+", "+cant4+", "+cant5+", '"+cambiorevision+"', "+idm1+")", cb);
}

function getModelom2ById(id, cb){
	conn("select modelo_m2.*, (select nombre from articu where articu.id = modelo_m2.id_rep1_fk) as rep1txt, (select nombre from articu where articu.id = modelo_m2.id_rep2_fk) as rep2txt, (select nombre from articu where articu.id = modelo_m2.id_rep3_fk) as rep3txt, (select nombre from articu where articu.id = modelo_m2.id_rep4_fk) as rep4txt, (select nombre from articu where articu.id = modelo_m2.id_rep5_fk) as rep5txt from modelo_m2 where id ="+id, cb);
}

function update(idm1, idm2, tipotareaid, descripcion, cambiorevision, idrep1, cant1, idrep2, cant2, idrep3, cant3, idrep4, cant4, idrep5, cant5, cb){
	conn("UPDATE `modelo_m2` SET `id_tipotarea_fk`="+tipotareaid+", `descripcion`='"+descripcion+"', `id_rep1_fk`="+idrep1+", `id_rep2_fk`="+idrep2+", `id_rep3_fk`="+idrep3+", `id_rep4_fk`="+idrep4+", `id_rep5_fk`="+idrep5+", `cant1`="+cant1+", `cant2`="+cant2+", `cant3`="+cant3+", `cant4`="+cant4+", `cant5`="+cant5+", `cambio_revision`='"+cambiorevision+"', `id_modelom1_fk`="+idm1+" WHERE id="+idm2, cb);
}

function del(id, cb){
	conn("DELETE FROM modelo_m2 where id="+id, cb);
}