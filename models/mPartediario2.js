var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllByPartediario1Id: getAllByPartediario1Id,
	insertNewEmpleado: insertNewEmpleado,
	insert: insert,
	getById: getById,
	updateRow: updateRow,
	del: del,
	delByIdpartediario1: delByIdpartediario1,
	saveRow: saveRow
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
	conn("select partediario2.*, emple.legajo as legajo, emple.nombre as nombre from partediario2 left join emple on emple.codigo = partediario2.id_emple_fk where partediario2.id_partediario1_fk="+id, cb);
}

function insertNewEmpleado(idpartediario1, idempleado, cb){
	conn("insert into partediario2(id_partediario1_fk, id_emple_fk) values("+idpartediario1+", "+idempleado+")", cb);
}

function insert(fecha, idsector, idlugar, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, cb){
	conn("INSERT INTO `partediario1`(`fecha`, `id_sector_fk`, `id_lugar_fk`, `estado`, `id_clasificacion1_fk`, `id_clasificacion2_fk`, `id_clasificacion3_fk`, `id_clasificacion4_fk`, `id_clasificacion5_fk`, `id_clasificacion6_fk`, `id_imputacion1_fk`, `id_imputacion2_fk`, `id_imputacion3_fk`, `id_imputacion4_fk`, `id_imputacion5_fk`, `id_imputacion6_fk`) VALUES ('"+fecha+"', "+idsector+", "+ idlugar +", 1, "+clasificacion1+", "+clasificacion2+", "+clasificacion3+", "+clasificacion4+", "+clasificacion5+", "+clasificacion6+", "+imputacion1+", "+imputacion2+", "+imputacion3+", "+imputacion4+", "+imputacion5+", "+imputacion6+")", cb);
}

function getById(id, cb){
	conn("select partediario1.*, DATE_FORMAT(partediario1.fecha, '%d/%m/%Y') as fechaf, lugares.nombre as lugartxt, sectores.nombre as sectortxt from partediario1 left join lugares on lugares.id = partediario1.id_lugar_fk left join sectores on sectores.id = partediario1.id_sector_fk where partediario1.id="+id, cb);
}

function updateRow(idpartediario1, idpartediario2, idemple, codigohora, entrada, salida, total, tipohora, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, cb){
	conn("UPDATE `partediario2` SET `id_partediario1_fk`="+idpartediario1+",`id_emple_fk`="+idemple+",`numero`=0,`id_codigohora_fk`="+codigohora+",`hr_entrada`='"+entrada+"',`hr_salida`='"+salida+"',`hr_total`="+total+",`id_tipohora_fk`="+tipohora+",`hrclasificacion1`="+clasificacion1+",`hrclasificacion2`="+clasificacion2+",`hrclasificacion3`="+clasificacion3+",`hrclasificacion4`="+clasificacion4+",`hrclasificacion5`="+clasificacion5+",`hrclasificacion6`="+clasificacion6+",`hrimputacion1`="+imputacion1+",`hrimputacion2`="+imputacion2+",`hrimputacion3`="+imputacion3+",`hrimputacion4`="+imputacion4+",`hrimputacion5`="+imputacion5+",`hrimputacion6`="+imputacion6+" WHERE id ="+idpartediario2, cb);
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