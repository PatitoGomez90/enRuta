var mFichadas = require('../models/mFichadas');
var mAyuda = require('../models/mAyuda');
var mEmple = require('../models/mEmple');
var mSectores = require('../models/mSectores');
var mRelojes = require('../models/mRelojes');
var async = require('async');

module.exports = {
	getLista: getLista,
	getFichadas: getFichadas,
	getVer: getVer,
	updateFichadas: updateFichadas,
	getFichadasByQuery: getFichadasByQuery,
	getByTarjetayFechas: getByTarjetayFechas,
	getFichadasPorSector: getFichadasPorSector,
	getSelectCountByFechaGroupBySector: getSelectCountByFechaGroupBySector
	// getAll: getAll,	
	// getFichadasByDesde: getFichadasByDesde,
	// getFichadasByHasta: getFichadasByHasta,
	// getFichadasByFecha: getFichadasByFecha
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function changeDate2(date){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	return fechaus;
	// output: dd/mm/yyyy
}

function getLista(req, res) {
	//req.session.nromenu = 11;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	updateFichadas(function () {
		mSectores.getAll(function (sectores){
			mEmple.getAllOrderByNombre(function (emples){
				res.render('fichadaslista', {
					pagename: 'Lista de Fichadas',
					sectores: sectores,
					emples: emples
				});
			});
		});
	});
}

function getFichadas(req, res){
	params = req.params;
	fecha= params.fecha;
	fecha = changeDate(fecha);

	mFichadas.getFichadasFromSQL(fecha, function (fichadas){
		console.log(fichadas)
		res.send(fichadas);
	});
}

function getAyuda(req, res){
	params = req.params;
	id = params.id;

	mAyuda.getAyuda(id, function (ayuda){
		res.send(ayuda);
	});
}

function getVer(req, res){
	params = req.params;
	reloj = params.reloj;
	fecha = params.fecha;
	fecha = changeDate(fecha);

	mFichadas.getFichada(reloj, fecha, function (fichada){
		mEmple.getAllActivos(function (emples){	
			mSectores.getAllActivos(function (sectores){
				mRelojes.getAll(function (relojes){
					res.render("fichadasver", {
						pagename: "Detalles de Fichada",
						fichada: fichada,
						relojes: relojes,
						sectores: sectores,
						emples: emples
					});
				});
			});
		});
	});
}

//el update q corre antes de cargar las fichadas
function updateFichadas(cb){
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		user: 'root',
		password: '',
		host: '127.0.0.1',
		port: '3306',
		database: 'Maresa',
		dateStrings : true
	});

	var lastficid = 0;
	mFichadas.getLastFicIdMySql(function (lastficidfrommysql){
		console.log("lastficidfrommysql: "+lastficidfrommysql[0].maxfic_id)
		if(lastficidfrommysql[0].maxfic_id == null)
		lastficid = 0;
		else
		lastficid = lastficidfrommysql[0].maxfic_id;

		console.log("last fic id (en mysql) antes de la request: "+lastficid);

		mFichadas.getLatestFicSQL(lastficid, function (latestfic){
			//console.log(latestfic[0])
			console.log("length del obj latestfichadas: "+latestfic.length)//67
			var i = 0;
			var querys = [];
			for (i = 0; i < latestfic.length; i++ ){
				query = "select fic_id from fichadas where fic_id = "+latestfic[i].FIC_ID;
				querys.push({query: query, id: i});
			}

			connection.connect();
			async.eachSeries(querys, function (data, callback) {
				console.log(data.query)
				connection.query(data.query, function(err, rows, fields) {
					if (err){
						throw err;
						console.log(err)
					}else{
						console.log("No errors in the query.")
					}
					console.log(rows.length)
					if (rows.length == 0){
						mFichadas.MySqlInsert(latestfic[data.id], function (){
							console.log(data.id)
							callback();
						});
					}else{
						console.log("Registro fic_id = "+latestfic[data.id].FIC_ID+" existente en MySql");
						callback();
					}
				});

			}, function (err) {
				//Esta parte se sejecuta cuando termina de recorrer el array
				// acomode la funcion "callback" de Async, ya que sino nos queda el callback
				// de 	mFichadas.MySqlInsert dando vueltas
				if (err) { throw err; }
				return cb();
			});
			//connection.end();
		});//end mF getlatestficsql
	});

}

//estas 5 funcioens son para el ajax de fichadaslista
function getFichadasByQuery(req, res){
	params = req.params;
	id_sector = params.sector;
	id_emple = params.id_emple;
	fecha_desde = params.desde;
	fecha_hasta = params.hasta;

	fecha_desde = decodeURIComponent(fecha_desde);
	fecha_hasta = decodeURIComponent(fecha_hasta);
	fecha_desde = changeDate(fecha_desde);
	fecha_hasta = changeDate(fecha_hasta);

	query = "select fichadas.*, DATE_FORMAT(fichadas.fic_fecha, '%d/%m/%Y') as fic_fechaf, "+ 
	"relojes.descripcion as relojtxt, "+
	"sectores.nombre as sectortxt, "+
	"ifnull(emple.nombre, 'No existe legajo') as empletxt, "+
	"ifnull(emple.legajo, '-->') as legajotxt "+
	"from fichadas "+
	"left join relojes on relojes.numero = fichadas.fic_reloj "+
	"left join sectores on sectores.id = relojes.id_sector_fk "+
	"left join emple on emple.tarjeta = fichadas.fic_tarjeta "+
	"where fic_fecha >= '"+fecha_desde+"' and fic_fecha <= '"+fecha_hasta+"'";

	if (id_emple != 0)
		query = query + " and emple.codigo = "+id_emple;
	else
		if (id_sector != 0)
			query = query + " and relojes.id_sector_fk = "+id_sector;

	//hacer tambien que filtre ENTRADA Y SALIDA (si selecciona ambos es TODO)
	query = query + " order by fic_fecha desc, fic_hora desc"

	mFichadas.getByQueryFromMySql(query, function (fichadas){
		res.send(fichadas);
	});
}

//SQL.FICHADAS.LEG_LEGAJO NO SE USA PORQUE HACE REFERENCIA A UN ID DE UNA TABLA DE LOS RELOJES 
//QUE NO TIENE CONCORDANCIA CON NUESTRA TABLA MYSQL.EMPLE.LEGAJO. EN CAMBIO SQL.FICHADAS.LEG_TARJETA SÍ TIENE RELACION
//CON MYSQL.EMPLE.TARJETA

//para partediario2modificar
	function getByTarjetayFechas(req, res){
		params = req.params;
		tarjeta = params.tarjeta;
		fecha_hoy = params.fecha_hoy;
		fecha_maniana = params.fecha_maniana;

		mFichadas.getByTarjetayFechas(tarjeta, fecha_hoy, fecha_maniana, function (fichadas){
			res.send(fichadas);
		});
	}

//Para Fichadas por sector
	function getFichadasPorSector(req, res){
		res.render('fichadasporsector',{
			pagename: "Fichadas por Sector"
		});
	}

	function getSelectCountByFechaGroupBySector(req, res){
		params = req.params;
		fecha = params.fecha;

		fecha = changeDate(fecha);
		var fichadasf = [];
		mFichadas.getFichadasPorSector(fecha, function (fichadas){
			for (var i = 0 ; i<fichadas.length ; i++){
				console.log(fichadas)
				switch (fichadas[i].id_reloj){
						case 33:
							isCoq = false
							isPa = true
							isMant = false
							isTa = false
							break;
						case 34:
							isCoq = false
							isPa = false
							isMant = true
							isTa = false
							break;
						case 35:
							isCoq = false
							isPa = false
							isMant = false
							isTa = true
							break;
						case 36:
							isCoq = true
							isPa = false
							isMant = false
							isTa = false
							break;
						default:
							isCoq = false
							isPa = false
							isMant = false
							isTa = false
					}	
				fichadaf = {
					id_reloj: fichadas[i].id_reloj,
					cantidad: fichadas[i].cantidad,
					sectortxt: fichadas[i].sectortxt,
					isCoq: isCoq,
					isPa: isPa,
					isMant: isMant,
					isTa: isTa
				}
				fichadasf.push(fichadaf)
			}
			res.send(fichadasf);
		});
	}