//requiriendo modelo mensaje.js:
var mUsuarios = require('../models/mUsuarios');
var mAgenda= require('../models/mAgenda');
var mAyuda = require('../models/mAyuda');
//requiriendo la conection string

module.exports = {
	getInicio: getInicio,
	getError: getError,
    getAyuda: getAyuda,
    AyudaVer: AyudaVer,
    getNovedades: getNovedades
}

function getInicio(req, res){
    // mAgenda.getLast3(function (items){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    hoy = yyyy+'/'+mm+'/'+dd;

    mAgenda.getTodayAgenda(hoy, function (items){
        // console.log(items)
        var itemslength = items.length;
        if (items.length == 1){
            res.render('inicio', {
                pagename: 'Evhsa',
                itemslength: itemslength,
                items: items[0]
            });  
        }else{
            res.render('inicio', {
                pagename: 'Evhsa',
                itemslength: itemslength,
                items: items
            });
        }
    });
}

function getError(req, res) {
	res.render('error',{
        pagename: 'Error',
	});
}

function getAyuda(req, res){
    mAyuda.getAll(function (ayudas){
        res.render('ayuda',{
            pagename: 'Ayuda',
            ayudas: ayudas
        });
    });
}

function AyudaVer(req, res){
    params = req.params;
    id = params.id;
    mAyuda.getAyuda(id, function (ayuda){
        //ayuda = ayuda[0];
        console.log(ayuda[0].texto);
        res.render('ayudaver',{
            pagename: 'Ver Ayuda de ' + ayuda[0].titulo,
            ayuda: ayuda[0]
        });
    });
}

function getNovedades(req, res){
    mNovedades.getAll(function (novedades){
        res.render('novedadeslista', {
            pagename: 'Lista de Novedades',
            novedades: novedades
        });  
    });  
}