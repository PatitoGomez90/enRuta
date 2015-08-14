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
	getAll: getAll,	
	getFichadasByDesde: getFichadasByDesde,
	getFichadasByHasta: getFichadasByHasta,
	getFichadasByFecha: getFichadasByFecha
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	//req.session.nromenu = 11;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	updateFichadas(function () {
		mSectores.getAll(function (sectores){
			res.render('fichadaslista', {
				pagename: 'Lista de Fichadas',
				sectores: sectores
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

//estas 4 funcioens son para el ajax de fichadaslista
function getAll(req, res){
	mFichadas.getAllFromMySql(function (fichadas){
		res.send(fichadas);
	});
}

function getFichadasByDesde(req, res){
	params = req.params;
	desde = params.desde;

	desde = changeDate(desde);
	mFichadas.getAllByDesdeFromMySql(desde, function (fichadasdesde){
		res.send(fichadasdesde);
	});
}

function getFichadasByHasta(req, res){
	params = req.params;
	hasta = params.hasta;

	hasta = changeDate(hasta);
	mFichadas.getAllByHastaFromMySql(hasta, function (fichadashasta){
		res.send(fichadashasta);
	});
}

function getFichadasByFecha(req, res){
	params = req.params;
	desde = params.desde;
	hasta = params.hasta;

	desde = changeDate(desde);
	hasta = changeDate(hasta);

	mFichadas.getAllByFechaFromMySql(desde, hasta, function (fichadasbyfecha){
		res.send(fichadasbyfecha);
	});
}