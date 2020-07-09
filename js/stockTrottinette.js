$(document).ready(function() {
    dataTrottinette();
  });
  
  const {Pool, Client} = require('pg')
  client = new Client({
      host: 'localhost',
      user: 'yohan',
      password: 'logitech',
      database: 'veleos',
  });
  
  client.connect()
  function dataTrottinette(){
    client.query('SELECT * FROM trottinette ORDER BY model DESC',(err,res)=>{
      for(var i =0;i < res.rows.length;i++){
        var item = res.rows[i];
        var model = item['model']
        var caracteristiques = item['caractéristiques']
        var couleur = item['couleur']
        var prix = item['prix']
        var quantite = item['quantite']
        $("#tableDataVelo").append('<tr><td>'+model+'</td><td>'+caracteristiques+'</td><td>'+couleur+'</td><td>'+prix+' €</td><td>'+quantite+'</td></tr>')
      }
      client.end()
    })
  }
  