function nbProduct(sel) {
    var nbProduct = sel.options[sel.selectedIndex].text
    $('.rowProduct').remove();
    for(var i =0;i < nbProduct;i++){
        var nFacture = i + 1
        $("#product").append("<th scope='row' class='rowProduct' id='rowProduct"+i+"'>Produit N°"+nFacture+"</th")
        $("#rowProduct"+i+"").append("<div class='row' syle='margin-top: 40px;' id='"+i+"'><select class='col-xs-2 offset-xs-1' onChange='typeProduct(this);'><option></option><option value='"+i+"'>Velo</option><option value='"+i+"'>Trottinette</option><option value='"+i+"'>Accessoires</option></select></div>")
    }
}

const {Pool, Client} = require('pg')
client = new Client({
    host: 'localhost',
    user: 'yohan',
    password: 'logitech',
    database: 'veleos',
});

client.connect()
function typeProduct(sel) {
    var typeOfProduct = sel.options[sel.selectedIndex].text
    var nbDiv = sel.options[sel.selectedIndex].value
    $(".containerVelo"+nbDiv+"").remove();
    if (typeOfProduct == 'Velo'){  
        $("#"+nbDiv+"").append("<div class='containerVelo"+nbDiv+"'><select id='modelVelo"+nbDiv+"'><option></option></select></div>")
        client.query('SELECT model FROM core_velo ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    let item = res.rows[i];
                    let model = item['model'];
                    $("#modelVelo"+nbDiv+"").append("<option  onChange='colorProduct(this);'>"+model+"</option>");
                }
            }
        })
    }
    if (typeOfProduct == 'Trottinette'){  
        $("#"+nbDiv+"").append("<div class='containerVelo"+nbDiv+"'><select id='modelVelo"+nbDiv+"'><option></option></select></div>")
        client.query('SELECT model FROM trottinette ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    let item = res.rows[i];
                    let model = item['model'];
                    $("#modelVelo"+nbDiv+"").append("<option>"+model+"</option>");
                }
            }
        })
    }
    if (typeOfProduct == 'Accessoires'){  
        $("#"+nbDiv+"").append("<div class='containerVelo"+nbDiv+"'><select id='modelVelo"+nbDiv+"'><option></option></select></div>")
        client.query('SELECT model FROM accessoire ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    let item = res.rows[i];
                    let model = item['model'];
                    $("#modelVelo"+nbDiv+"").append("<option>"+model+"</option>");
                }
            }
        })
    }
};

function colorProduct(sel) {
    var product = sel.options[sel.selectedIndex].text
    var nbDiv = sel.options[sel.selectedIndex].value
    $(".containerColor"+nbDiv+"").remove();
    $("#"+nbDiv+"").append("<div class='containerColor"+nbDiv+"'><select id='colorVelo"+nbDiv+"'><option></option></select></div>")
    client.query("SELECT id FROM core_velo WHERE model=\'"+product+"\'",(err,res)=>{
        if (err) { console.error(err); return; }
        else{
            for(var i =0;i < res.rows.length;i++){
                let item = res.rows[i];
                let idProduct = item['id'];
                client.query("SELECT color_id FROM core_velo_stock WHERE velo_id=\'"+idProduct+"\'",(err,res)=>{
                    if (err) { console.error(err); return; }
                    else{
                        for(var i =0;i < res.rows.length;i++){
                            let item = res.rows[i];
                            let color = item['color_id'];
                            client.query("SELECT * FROM core_color WHERE id=\'"+color+"\'",(err,res)=>{
                                if (err) { console.error(err); return; }
                                else{
                                  for(var i =0;i < res.rows.length;i++){
                                    let item2 = res.rows[i];
                                    let couleur = item2['color']
                                    $("#colorVelo"+nbDiv+"").append("<option>"+couleur+"</option>");
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
};

function printFacture(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var adress = document.getElementById("adress").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    if (fname === 0 || lname.length === 0 || adress.length === 0 || city.length === 0 || zip.length === 0){
        //pass
    }
    else{
    myWindow = window.open("factureToPrint.html?fname="+fname+"&lname="+lname+"&adress="+adress+"&city="+city+"&zip="+zip, "myWindow", "width=1000,height=1000");
    }
};

