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
  client.query('SELECT * FROM core_velo ORDER BY model DESC',(err,res)=>{
    for(var i =0;i < res.rows.length;i++){
      var item = res.rows[i];
      var model = item['model']
      var taille = 0
      var moteur = item['moteur']
      var couleur = 0  
      var prix = item['prix']
      var quantite = 0
      $("#tableDataVelo").append('<tr><td>'+model+'</td><td>'+taille+'</td><td>'+moteur+'</td><td>'+couleur+'</td><td>'+prix+'</td><td>'+quantite+'</td></tr>')
    }
    client.end()
  })
}
