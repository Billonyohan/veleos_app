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
    if (err) { console.error(err); return; }
    else{
      for(var i =0;i < res.rows.length;i++){
        let item = res.rows[i];
        let id = item['id']
        let model = item['model']
        let prix = item['prix']
        client.query('SELECT * FROM core_velo_stock WHERE velo_id='+id+'',(err1,res1)=>{
          if (err1) { console.error(err1); return; }
          else{
            for(var i =0;i < res1.rows.length;i++){
              let item1 = res1.rows[i];
              let taille = item1['size']
              let couleur = item1['color_id']
              let quantite = item1['quantite']
              client.query('SELECT * FROM core_color WHERE id='+couleur+'',(err2,res2)=>{
                if (err2) { console.error(err1); return; }
                else{
                  for(var i =0;i < res2.rows.length;i++){
                    let item2 = res2.rows[i];
                    let couleur = item2['color']
                $("#tableDataVelo").append('<tr><td>'+model+'</td><td>'+taille+'</td><td>'+couleur+'</td><td>'+quantite+'</td><td>'+prix+' €</td></tr>')
                  }
                }
              })
            }
          }
        })
      }
    }
    client.end()
  })
}

