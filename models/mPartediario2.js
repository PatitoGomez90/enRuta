var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllByPartediario1Id: getAllByPartediario1Id,
	insertNewEmpleado: insertNewEmpleado,
	getById: getById,
	update: update,
	del: del,
	delByIdpartediario1: delByIdpartediario1,
	getEmpleInPartediario2: getEmpleInPartediario2
}

function getAll(cb){
	//sectortxt lugartxt fechaf
	conn("select partediario1.*, DATE_FORMAT(partediario1.fecha, '%d/%m/%Y') as fechaf, lugares.nombre as lugartxt, sectores.nombre as sectortxt from partediario1 left join lugares on lugares.id = partediario1.id_lugar_fk left join sectores on sectores.id = partediario1.id_sector_fk", cb);
}

function getAllByPartediario1Id(id, cb){
	//legajo, nombre from emple with id_emple_fk
	//clasificacion1txt... clasificacion6txt
	//item1txt... item6txt
	//ej:  (select nombre from articu where articu.id = modelo_m2.id_rep1_fk) as rep1txt
	conn("select partediario2.*, emple.legajo as legajo, emple.nombre as nombre, codigohora.numero as codigohoracod from partediario2 left join codigohora on codigohora.id = partediario2.id_codigohora_fk left join emple on emple.codigo = partediario2.id_emple_fk where partediario2.id_partediario1_fk="+id, cb);
}

function getById(id, cb){
	conn("select partediario2.*, emple.legajo as legajo, emple.nombre as nombre, codigohora.nombre as codigohoratxt from partediario2 left join emple on emple.codigo = partediario2.id_emple_fk left join codigohora on codigohora.id = partediario2.id_codigohora_fk where partediario2.id="+id, cb);
}

function insertNewEmpleado(idpartediario1, idempleado, cb){
	conn("insert into partediario2(id_partediario1_fk, id_emple_fk) values("+idpartediario1+", "+idempleado+")", cb);
}

function update(id, codigohora, entrada, salida, total, adicional1_n, adicional1_50, adicional1_100, adicional2_n, adicional2_50, adicional2_100, adicional3_n, adicional3_50, adicional3_100, adicional4_n, adicional4_50, adicional4_100, adicional5_n, adicional5_50, adicional5_100, adicional6_n, adicional6_50, adicional6_100, item1, item2, item3, item4, item5, item6, cb){
	conn("UPDATE `partediario2` SET `id_codigohora_fk`="+codigohora+", `hr_entrada`='"+entrada+"', `hr_salida`='"+salida+"', `hr_total`='"+total+"', `adicional1_n`="+adicional1_n+",`adicional1_50`="+adicional1_50+", `adicional1_100`="+adicional1_100+", `adicional2_n`="+adicional2_n+",`adicional2_50`="+adicional2_50+", `adicional2_100`="+adicional2_100+", `adicional3_n`="+adicional3_n+",`adicional3_50`="+adicional3_50+", `adicional3_100`="+adicional3_100+", `adicional4_n`="+adicional4_n+",`adicional4_50`="+adicional4_50+", `adicional4_100`="+adicional4_100+", `adicional5_n`="+adicional5_n+",`adicional5_50`="+adicional5_50+", `adicional5_100`="+adicional5_100+", `adicional6_n`="+adicional6_n+",`adicional6_50`="+adicional6_50+", `adicional6_100`="+adicional6_100+", `item1`="+item1+",`item2`="+item2+",`item3`="+item3+",`item4`="+item4+",`item5`="+item5+",`item6`="+item6+" WHERE partediario2.id ="+id, cb);
}

function del(id, cb){
	conn("delete from partediario2 where partediario2.id="+id, cb);
}

function delByIdpartediario1(id, cb){
	conn("delete from partediario2 where partediario2.id_partediario1_fk="+id, cb);
}

function getEmpleInPartediario2(idp1, idemple, cb){
	conn("select count(id_partediario1_fk) as cant from partediario2 where id_partediario1_fk="+idp1+" and id_emple_fk="+idemple, cb);
}