$(document).ready(function() {
  dataBike();
});

const {Pool, Client} = require('pg')
client = new Client({
    host: 'localhost',
    user: 'yohan',
    password: 'logitech',
    database: 'veleos',
});

client.connect()
function dataBike(){
  client.query('SELECT * FROM velo ORDER BY model ASC',(err,res)=>{
    if (err) { console.error(err); return; }
    else{
      for(var i =0;i < res.rows.length;i++){
        let item = res.rows[i];
        let model = item['model']
        let prix = item['prix']
        let caracteristiques = item['caracteristiques']
        let quantite = item['quantite']
        $("#tableDataVelo").append('<tr><td>'+model+'</td><td>'+caracteristiques+'</td><td>'+quantite+'</td><td>'+prix+' €</td></tr>')
      }
    }
  })
}

