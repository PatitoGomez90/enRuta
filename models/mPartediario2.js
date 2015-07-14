var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllByPartediario1Id: getAllByPartediario1Id,
	insertNewEmpleado: insertNewEmpleado,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	//sectortxt lugartxt fechaf
	conn("select partediario1.*, DATE_FORMAT(partediario1.fecha, '%d/%m/%Y') as fechaf, lugares.nombre as lugartxt, sectores.nombre as sectortxt from partediario1 left join lugares on lugares.id = partediario1.id_lugar_fk left join sectores on sectores.id = partediario1.id_sector_fk", cb);
}

function getAllByPartediario1Id(id, cb){
	//legajo, nombre from emple with id_emple_fk
	//clasificacion1txt... clasificacion6txt
	//imputacion1txt... imputacion6txt
	//ej:  (select nombre from articu where articu.id = modelo_m2.id_rep1_fk) as rep1txt
	conn("select partediario2.*, emple.legajo as legajo, emple.nombre as nombre, tipohora.nombre as tipohoratxt, codigohora.numero as codigohoracod from partediario2 left join codigohora on codigohora.id = partediario2.id_codigohora_fk left join tipohora on tipohora.id = partediario2.id_tipohora_fk left join emple on emple.codigo = partediario2.id_emple_fk where partediario2.id_partediario1_fk="+id, cb);
}

function getById(id, cb){
	conn("select partediario2.*, emple.legajo as legajo, emple.nombre as nombre, codigohora.nombre as codigohoratxt, tipohora.nombre as tipohoratxt from partediario2 left join emple on emple.codigo = partediario2.id_emple_fk left join codigohora on codigohora.id = partediario2.id_codigohora_fk left join tipohora on tipohora.id = partediario2.id_tipohora_fk where partediario2.id="+id, cb);
}

function insertNewEmpleado(idpartediario1, idempleado, cb){
	conn("insert into partediario2(id_partediario1_fk, id_emple_fk) values("+idpartediario1+", "+idempleado+")", cb);
}

function update(id, codigohora, entrada, salida, total, tipohora, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, cb){
	conn("UPDATE `partediario2` SET `id_codigohora_fk`="+codigohora+", `hr_entrada`='"+entrada+"', `hr_salida`='"+salida+"', `hr_total`='"+total+"', `id_tipohora_fk`="+tipohora+", `hrclasificacion1`="+clasificacion1+",`hrclasificacion2`="+clasificacion2+",`hrclasificacion3`="+clasificacion3+",`hrclasificacion4`="+clasificacion4+",`hrclasificacion5`="+clasificacion5+",`hrclasificacion6`="+clasificacion6+",`hrimputacion1`="+imputacion1+",`hrimputacion2`="+imputacion2+",`hrimputacion3`="+imputacion3+",`hrimputacion4`="+imputacion4+",`hrimputacion5`="+imputacion5+",`hrimputacion6`="+imputacion6+" WHERE partediario2.id ="+id, cb);
}

function del(id, cb){
	conn("delete from partediario1 where partediario1.id="+id, cb);
}


function delByIdpartediario1(id, cb){
	conn("delete from partediario2 where partediario2.id_partediario1_fk="+id, cb);
}

function saveRow(idp2, txt, cb){
	conn("update partediario2 set entrada = "+txt+" where id="+idp2, cb);
}