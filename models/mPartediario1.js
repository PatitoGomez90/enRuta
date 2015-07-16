var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	//sectortxt lugartxt fechaf
	conn("select partediario1.*, DATE_FORMAT(partediario1.fecha, '%d/%m/%Y') as fechaf, lugares.nombre as lugartxt, sectores.nombre as sectortxt from partediario1 left join lugares on lugares.id = partediario1.id_lugar_fk left join sectores on sectores.id = partediario1.id_sector_fk", cb);
}

function insert(fecha, idsector, idlugar, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, cb){
	conn("INSERT INTO `partediario1`(`fecha`, `id_sector_fk`, `id_lugar_fk`, `estado`, `id_clasificacion1_fk`, `id_clasificacion2_fk`, `id_clasificacion3_fk`, `id_clasificacion4_fk`, `id_clasificacion5_fk`, `id_clasificacion6_fk`, `id_imputacion1_fk`, `id_imputacion2_fk`, `id_imputacion3_fk`, `id_imputacion4_fk`, `id_imputacion5_fk`, `id_imputacion6_fk`) VALUES ('"+fecha+"', "+idsector+", "+ idlugar +", 1, "+clasificacion1+", "+clasificacion2+", "+clasificacion3+", "+clasificacion4+", "+clasificacion5+", "+clasificacion6+", "+imputacion1+", "+imputacion2+", "+imputacion3+", "+imputacion4+", "+imputacion5+", "+imputacion6+")", cb);
}

function getById(id, cb){
	conn("select partediario1.*, (select nombre from clasificacion_hora where clasificacion_hora.id = partediario1.id_clasificacion1_fk) as clasificacion1txt, (select nombre from clasificacion_hora where clasificacion_hora.id = partediario1.id_clasificacion2_fk) as clasificacion2txt, (select nombre from clasificacion_hora where clasificacion_hora.id = partediario1.id_clasificacion3_fk) as clasificacion3txt, (select nombre from clasificacion_hora where clasificacion_hora.id = partediario1.id_clasificacion4_fk) as clasificacion4txt, (select nombre from clasificacion_hora where clasificacion_hora.id = partediario1.id_clasificacion5_fk) as clasificacion5txt, (select nombre from clasificacion_hora where clasificacion_hora.id = partediario1.id_clasificacion6_fk) as clasificacion6txt, (select numero from imputacion_hora where imputacion_hora.id = partediario1.id_imputacion1_fk) as imputacion1txt, (select numero from imputacion_hora where imputacion_hora.id = partediario1.id_imputacion2_fk) as imputacion2txt, (select numero from imputacion_hora where imputacion_hora.id = partediario1.id_imputacion3_fk) as imputacion3txt, (select numero from imputacion_hora where imputacion_hora.id = partediario1.id_imputacion4_fk) as imputacion4txt, (select numero from imputacion_hora where imputacion_hora.id = partediario1.id_imputacion5_fk) as imputacion5txt, (select numero from imputacion_hora where imputacion_hora.id = partediario1.id_imputacion6_fk) as imputacion6txt, DATE_FORMAT(partediario1.fecha, '%d/%m/%Y') as fechaf, lugares.nombre as lugartxt, sectores.nombre as sectortxt from partediario1 left join lugares on lugares.id = partediario1.id_lugar_fk left join sectores on sectores.id = partediario1.id_sector_fk where partediario1.id="+id, cb);
}

function update(id, fecha, idsector, idlugar, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, cb){
	conn("UPDATE `partediario1` SET `fecha`='"+fecha+"',`id_sector_fk`="+idsector+",`id_lugar_fk`="+idlugar+",`estado`="+estado+",`id_clasificacion1_fk`="+clasificacion1+",`id_clasificacion2_fk`="+clasificacion2+",`id_clasificacion3_fk`="+clasificacion3+",`id_clasificacion4_fk`="+clasificacion4+",`id_clasificacion5_fk`="+clasificacion5+",`id_clasificacion6_fk`="+clasificacion6+",`id_imputacion1_fk`="+imputacion1+",`id_imputacion2_fk`="+imputacion2+",`id_imputacion3_fk`="+imputacion3+",`id_imputacion4_fk`="+imputacion4+",`id_imputacion5_fk`="+imputacion5+",`id_imputacion6_fk`="+imputacion6+" WHERE id ="+id, cb);
}

function del(id, cb){
	conn("delete from partediario1 where partediario1.id="+id, cb);
}

