//requiriendo modelo mensaje.js:
var mAccesos = require('../models/mAccesos');

module.exports = {
  getAccesos: getAccesos,
  postAccesos: postAccesos
  }

function getAccesos(req, res){
  params = req.params;
  idusuario = params.id;

  
    mAccesos.getMenues(function(docs){
      //console.log(docs.length)
      mAccesos.getAccesos(function(accesos){
        mAccesos.getAccesosPorUsuario(idusuario, function(docs3){
        //console.log(docs3.length)
        if ( docs.length == docs3.length){
          res.render('accesoslista', {
            idUsuario: idusuario,
            pagename: 'Lista de Accesos',
            menues: docs,
            accesos: accesos,
            usuario_accesos: docs3
          });  
        }else{
          //var arJ1 = [{a:1},{a:2}, {a:3}, {a:4}, {a:5}];
          //var arJ2 = [{a:1}, {a:3}, {a:2}];
          var band = false;
          var noEsta = [];

          docs.forEach(function (e) {
                 docs3.forEach(function (d) {
                         if ( e.id == d.menu ) {
                                 band = true
                         } 
                 })
                 if (!band) {
                        mAccesos.insertAcceso(idusuario, e.id, function(data){
                          mAccesos.getMenues(function(docs){
                             mAccesos.getAccesos(function(accesos){
                                mAccesos.getAccesosPorUsuario(idusuario, function(docs3){
                                  res.render('accesoslista', {
                                    idUsuario: idusuario,
                                    pagename: 'Lista de Accesos',
                                    menues: docs,
                                    accesos: accesos,
                                    usuario_accesos: docs3
                                  }); 
                                });
                              });
                            });
                        });
                         console.log("No esta: " + e.id)
                         noEsta.push(e.a)
                 }
                 band = false;
          }); 
        }
                
      }); 
    });    
  });
}

function postAccesos(req, res){
  var idUsuario = req.body.idUsuario;
  var accesos = {};
  mAccesos.getMenues(function(docs){
    mAccesos.getAccesos(function(accesos){
      docs.forEach(function(menu, idx) {
        accesos[menu.id] = [];
          accesos.forEach(function(acceso, idx2) {
            if (req.body[menu.id+'-'+acceso.descripcion] == 'on') {
              accesos[menu.id].push({ acceso: acceso.descripcion, checked: true });
            } else {
              accesos[menu.id].push({ acceso: acceso.descripcion, checked: false });
            }
          });
      });
      //console.log(accesos);
      mAccesos.addAccesos(idUsuario, accesos, function() {
        res.redirect('/usuarioslista')
      })
    });
  });
}