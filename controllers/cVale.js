var mArt = require('../models/mArticulos');
var mBorro = require('../models/mBorro');
var mTipoVale = require('../models/mTipoVale');
var mSector = require('../models/mSectores');
var mVale = require('../models/mVales');
var mMovi = require('../models/mMovi');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getConsulta: getConsulta,
	getAlta: getAlta,
	postAlta: postAlta,
	getVales: getVales,
	getVerVales: getVerVales,
	getDel: getDel,
	getAyuda: getAyuda
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getConsulta(req, res) {
	req.session.nromenu = 11;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		mSector.getAllActivos(function (sectores){
			res.render('valesconsulta', {
				pagename: 'Consulta de Vales',
				ayuda: ayuda[0],
				sectores: sectores
			});
		});
	});	
}

function getAlta(req, res){
	req.session.nromenu = 10;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		mArt.getAllActivos(function (arts){
			mTipoVale.getAll(function (tipos){			
				mSector.getAllActivos(function (sectores){
					res.render('valesalta', {
						pagename: 'Alta de Vales',
						arts: arts,
						tipos: tipos,
						sectores: sectores,
						ayuda: ayuda[0]
					});
				});
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idtipovale = params.tipovale;
	fecha = params.fecha;
	fecha = changeDate(fecha);
	articulo = params.articulo;
	cantidad = params.cantidad;
	depor = params.depor;
	depdes = params.depdes;
	secor = params.secor;
	secdes = params.secdes;
	costou = params.costou;
	costot = params.costot;
	
	if (cantidad < 100000){
		if (depor != depdes){
			if (cantidad != 0){
				error = 1;	
				switch(depor) {
					case "0":
						break;
					default:
						mArt.updateStockResta(articulo, depor, cantidad, function(){
						});
						break;
				}
				switch(depdes){
					case "0":
						break;
					default:
						mArt.updateStockSuma(articulo, depdes, cantidad, function(){
						});
						break;
				}
				//aca tengo que insertar el movimiento y obtener el numero para grabarlo en el vale
				//agregar movimiento
				fechahoy = new Date();
				day = fechahoy.getDate();
				month = fechahoy.getMonth();
				year = fechahoy.getFullYear();
				if (day<10)
					day = "0"+day;
				if (month<10)
					month = "0"+month;
				fechahoy = year + "/" + month + "/" + day;
				mMovi.add(fechahoy,req.session.user.unica, function(){
					mMovi.getUltimo(function (docs){
						nmovi = docs[0].id;
						mVale.insert(idtipovale, fecha, nmovi, articulo, cantidad, depor, depdes, secor, secdes, costou, costot, function(){
							res.redirect('/valesalta');
						});
					});
				});
			}else{
				res.render('error', {          
		          error: "El campo cantidad es obligatorio y tiene que ser mayor que cero."
		        });	
			}
		}
		else{
			res.render('error', {          
	          error: "Los depositos de Origen y de Destino no pueden ser los mismos."
	        });
		}
	}else{
		res.render('error', {          
          	error: "El campo cantidad no puede ser mayor a 100.000."
        });
	}
	
}

function getVales(req, res){
	params = req.params;
	finicio = params.finicio;
	ffin = params.ffin;
	finicio = changeDate(finicio);
	ffin = changeDate(ffin);
	sector = params.sector;

	if (sector == 0){
		mVale.getValesEntreFechas(finicio, ffin, function (vales){
			//console.log(vales)
			res.send(vales);
		});
	}else{
		mVale.getValesEntreFechasYSector(finicio, ffin, sector, function (vales){
			//console.log(vales)
			res.send(vales);
		});
	}
}

function getVerVales(req, res){
	params = req.params;
	id = params.id;

	mVale.getVale(id, function (vale){
		res.render('valesver',{
			pagename: 'Ver Vale',
			vale: vale[0]
		});
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	//traer vale, para sacarle articulo y cantidad
	mVale.getVale(id, function (vale){
		vale = vale[0];
		if (vale.Dorigen != vale.Ddestino){
			if (vale.cantidad != 0){
				error = 1;	
				switch(vale.Dorigen) {
					case "0":
						break;
					default:
						mArt.updateStockResta(vale.Idarticulo, vale.Ddestino, vale.cantidad, function(){
						});
						break;
				}
				switch(vale.Ddestino){
					case "0":
						break;
					default:
						mArt.updateStockSuma(vale.Idarticulo, vale.Dorigen, vale.cantidad, function(){
						});
						break;
				}
				//aca tengo que insertar el movimiento y obtener el numero para grabarlo en el vale
				//agregar movimiento
				fechahoy = new Date();
				day = fechahoy.getDate();
				month = fechahoy.getMonth();
				year = fechahoy.getFullYear();
				if (day<10)
					day = "0"+day;
				if (month<10)
					month = "0"+month;
				fechahoy = year + "/" + month + "/" + day;
				mMovi.add(fechahoy,req.session.user.unica, function(){
					mMovi.getUltimo(function (docs){
						nmovi = docs[0].id;
						mBorro.add(req.session.user.usuario, "Vales", "Borra valeid: "+ vale.Nroid, function(){
							mVale.del(id, function(){
								res.redirect('valesconsulta');
							});
						})
						
					});
				});
			}else{
				res.render('error', {          
		          error: "El campo cantidad es obligatorio y tiene que ser mayor que cero."
		        });	
			}
		}
		else{
			res.render('error', {          
	          error: "Los depositos de Origen y de Destino no pueden ser los mismos."
	        });
		} 
	});	
}

function getAyuda(req, res){
	params = req.params;
	id = params.id;

	mAyuda.getAyuda(id, function (ayuda){
		res.send(ayuda);
	});
}