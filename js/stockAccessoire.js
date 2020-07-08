$(document).ready(function() {
    dataAccessoire();
  });
  
  const {Pool, Client} = require('pg')
  client = new Client({
      host: 'localhost',
      user: 'yohan',
      password: 'logitech',
      database: 'veleos',
  });
  
  client.connect()
  function dataAccessoire(){
    client.query('SELECT * FROM accessoire ORDER BY model DESC',(err,res)=>{
      for(var i =0;i < res.rows.length;i++){
        var item = res.rows[i];
        var model = item['model']
        var caracteristiques = item['caractéristiques']
        var prix = item['prix']
        var quantite = item['quantite']
        $("#tableDataVelo").append('<tr><td>'+model+'</td><td>'+caracteristiques+'</td><td>'+prix+'</td><td>'+quantite+'</td></tr>')
      }
      client.end()
    })
  }
  