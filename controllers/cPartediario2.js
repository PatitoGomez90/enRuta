var mPartediario1 = require('../models/mPartediario1');
var mPartediario2 = require('../models/mPartediario2');
var mAyuda = require('../models/mAyuda');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mClasificacion = require('../models/mClasificacion')
var mImputacion = require('../models/mImputacion');
var mEmple = require('../models/mEmple');
var mTipoHora = require('../models/mTipoHora');
var mCodigohora = require('../models/mCodigoHora');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getEmples: getEmples,
	getEmpleInPartediario2: getEmpleInPartediario2
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	params = req.params;
	id = params.id;
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mPartediario1.getById(id, function (partediario1){
		//console.log(partediario1[0])
		mPartediario2.getAllByPartediario1Id(id, function (partediario2s){
			mTipoHora.getAllActivos(function (tipohoras){
				res.render('partediario2lista', {
		        	pagename: 'Lista de Empleados',
		        	partediario2s: partediario2s,
		        	partediario1: partediario1[0],
		        	tipohoras: tipohoras
		        	//ayuda: ayuda[0]
		      	}); 
			});		
		}); 	
	});	   
	//});
};


function getAlta(req, res){
	params = req.params;
	id = params.id;
	mSectores.getAll(function (sectores){
		mEmple.getAllActivos(function (empleados){
			res.render('partediario2alta', {
				pagename: "Alta de Empleado",
				empleados: empleados,
				idpartediario1: id,
				sectores: sectores
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idempleado = params.empleado;
	idpartediario1 = params.idpartediario1;

	//acá corregir para que agrege bien el Numero de empleado en el PArte Diario
	//se va a agregar el campo numero en la funcion insertNewEmpleado

	if( idempleado != 0){
		mPartediario2.getLastNumerobyPd1(idpartediario1, function (lastnumero){
			lastnumero = lastnumero[0].ultnumero;
			console.log(lastnumero)
			if (lastnumero != null){
				lastnumeroInt = parseInt(lastnumero)
				var proxnro = lastnumeroInt +1;	
			}else{
				var proxnro = 1;
			}
			
			mPartediario2.insertNewEmpleado(idpartediario1, idempleado, proxnro, function(){
				res.redirect('partediario2lista/'+idpartediario1);
			});
		});
	}else{
		res.redirect('partediario2lista/'+idpartediario1);
	}
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mPartediario2.getById(id, function (partediario2){
		mPartediario1.getById(partediario2[0].id_partediario1_fk, function (partediario1){
			mLugares.getAllActivos(function (lugares){
				mSectores.getAllActivos(function (sectores){
					mClasificacion.getAllActivos(function (clasificaciones){
						mImputacion.getAllActivos(function (items){
							mCodigohora.getAll(function (codigoshora){
								mTipoHora.getAll(function (tiposhora){
									//console.log(partediario1[0])
									res.render('partediario2modificar', {
										pagename: "Modificar Parte Diario",
										partediario2: partediario2[0],
										partediario1: partediario1[0],
										items: items,
										clasificaciones: clasificaciones,
										sectores: sectores,
										lugares: lugares,
										codigoshora: codigoshora,
										tiposhora: tiposhora
									});
								});
							});
						});
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	idpartediario1 = params.idpartediario1;
	codigohora = params.codigohora;
	entrada = params.entrada;
	salida = params.salida;
	total = params.total;
	//nuevos campos
	adicional1_n = params.adicional1_n;
	adicional1_50 = params.adicional1_50;
	adicional1_100 = params.adicional1_100;
	if (!adicional1_n)
		adicional1_n = 0;
	if (!adicional1_50)
		adicional1_50 = 0;
	if (!adicional1_100)
		adicional1_100 = 0;
	adicional2_n = params.adicional2_n;
	adicional2_50 = params.adicional2_50;
	adicional2_100 = params.adicional2_100;
	if (!adicional2_n)
		adicional2_n = 0;
	if (!adicional2_50)
		adicional2_50 = 0;
	if (!adicional2_100)
		adicional2_100 = 0;
	adicional3_n = params.adicional3_n;
	adicional3_50 = params.adicional3_50;
	adicional3_100 = params.adicional3_100;
	if (!adicional3_n)
		adicional3_n = 0;
	if (!adicional3_50)
		adicional3_50 = 0;
	if (!adicional3_100)
		adicional3_100 = 0;
	adicional4_n = params.adicional4_n;
	adicional4_50 = params.adicional4_50;
	adicional4_100 = params.adicional4_100;
	if (!adicional4_n)
		adicional4_n = 0;
	if (!adicional4_50)
		adicional4_50 = 0;
	if (!adicional4_100)
		adicional4_100 = 0;
	adicional5_n = params.adicional5_n;
	adicional5_50 = params.adicional5_50;
	adicional5_100 = params.adicional5_100;
	if (!adicional5_n)
		adicional5_n = 0;
	if (!adicional5_50)
		adicional5_50 = 0;
	if (!adicional5_100)
		adicional5_100 = 0;
	adicional6_n = params.adicional6_n;
	adicional6_50 = params.adicional6_50;
	adicional6_100 = params.adicional6_100;
	if (!adicional6_n)
		adicional6_n = 0;
	if (!adicional6_50)
		adicional6_50 = 0;
	if (!adicional6_100)
		adicional6_100 = 0;
	//fin nuevos campos, actualizar "imputacion" por "items"
	item1 = params.item1;
	if (!item1)
		item1 = 0;
	item2 = params.item2;
	if (!item2)
		item2 = 0;
	item3 = params.item3;
	if (!item3)
		item3 = 0;
	item4 = params.item4;
	if (!item4)
		item4 = 0;
	item5 = params.item5;
	if (!item5)
		item5 = 0;
	item6 = params.item6;
	if (!item6)
		item6 = 0;

	mPartediario2.update(id, codigohora, entrada, salida, total, adicional1_n, adicional1_50, adicional1_100, adicional2_n, adicional2_50, adicional2_100, adicional3_n, adicional3_50, adicional3_100, adicional4_n, adicional4_50, adicional4_100, adicional5_n, adicional5_50, adicional5_100, adicional6_n, adicional6_50, adicional6_100, item1, item2, item3, item4, item5, item6, function(){
		res.redirect('partediario2lista/'+idpartediario1);
	});
}

function getEmples(req, res){
	params = req.params;
	sector = params.id;

	mEmple.getEmpleBySector(sector, function (emples){
		res.send(emples);
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mPartediario2.getById(id, function (p2){
		p2 = p2[0];
		mPartediario2.del(id, function (){
			res.redirect('partediario2lista/'+p2.id_partediario1_fk);
		});
	});
}

function getEmpleInPartediario2(req, res){
	params = req.params;
	idpartediario1 = params.idp1;
	idemple = params.idemple;

	mPartediario2.getEmpleInPartediario2(idpartediario1, idemple, function (resultado){
		res.send(resultado);
	});
}