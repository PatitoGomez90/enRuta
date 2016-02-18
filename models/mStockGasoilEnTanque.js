var conn = require('../config/db').conn;

module.exports = {
	getStock: getStock
}

function getStock(id_tanque, fecha, cb){
	conn("SELECT sum(comb_planilladiaria.gas) as gasoil_gastado, (select sum(litros) from tank where tank.fecha <= '"+fecha+"' AND id_tanque_fk = "+id_tanque+") as gasoil_ensisterna FROM evhsa.comb_planilladiaria where comb_planilladiaria.fecha <= '"+fecha+"' AND comb_planilladiaria.id_tanque_fk = "+id_tanque+";", cb);
}