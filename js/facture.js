function nbProduct(sel) {
    let nbProduct = sel.options[sel.selectedIndex].text
    $('.rowProduct').remove();
    for(var i =0;i < nbProduct;i++){
        let nFacture = i + 1
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
        $("#"+nbDiv+"").append("<div class='containerVelo"+nbDiv+"'><select id='containerVelo"+nbDiv+"' onChange='quantiteVelo(this)'><option></option></select></div>")
        client.query('SELECT model FROM core_velo ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    let item = res.rows[i];
                    let model = item['model'];
                    $("#containerVelo"+nbDiv+"").append("<option>"+model+"</option>");
                }
            }
        })
    }
    $(".containerTrottinette"+nbDiv+"").remove();
    if (typeOfProduct == 'Trottinette'){
        $("#"+nbDiv+"").append("<div class='containerTrottinette"+nbDiv+"'><select id='containerTrottinette"+nbDiv+"' onChange='quantiteTrottinette(this)'><option></option></select></div>")
        client.query('SELECT model FROM trottinette ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    let item = res.rows[i];
                    let model = item['model'];
                    modelSplit = model.split(' ').join('');
                    $("#containerTrottinette"+nbDiv+"").append("<option>"+model+"</option>");
                }
                $("#modelTrottinette"+nbDiv+"").append("<div><select id="+modelSplit+"></select></div>");
            }
        })
    }
    $(".containerAccessoire"+nbDiv+"").remove();
    if (typeOfProduct == 'Accessoires'){
        $("#"+nbDiv+"").append("<div class='containerAccessoire"+nbDiv+"'><select id='containerAccessoire"+nbDiv+"' onChange='quantiteAccessoire(this)'><option></option></select></div>")
        client.query('SELECT model FROM accessoire ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    let item = res.rows[i];
                    let model = item['model'];
                    modelSplit = model.split(' ').join('');
                    $("#containerAccessoire"+nbDiv+"").append("<option>"+model+"</option>");
                }
                $("#modelAccessoire"+nbDiv+"").append("<div><select id="+modelSplit+"></select></div>");
            }
        })
    }
};

function quantiteVelo(sel){
    var product = sel.options[sel.selectedIndex].text
    var productSplit = product.split(' ').join('');
    var nbDiv = sel.id
    $("#quantiteVelo"+nbDiv+"").remove();
    $("."+nbDiv+"").append("<div id='quantiteVelo"+nbDiv+"'><select id="+productSplit+"><option></option></select></div>");
    client.query("SELECT id FROM core_velo WHERE model=\'"+product+"\'",(err,res)=>{
        if (err) { console.error(err); return; }
        else{
            let productID = res.rows[0]['id'];
        client.query("SELECT quantite FROM core_velo_stock WHERE velo_id=\'"+productID+"\'",(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                let quantite = res.rows[0]['quantite'];
                $("#"+productSplit+"").append("<option>"+quantite+"</option>");         
                }
            })
        }
    })
};

function quantiteTrottinette(sel){
    var product = sel.options[sel.selectedIndex].text
    var productSplit = product.split(' ').join('');
    var nbDiv = sel.id
    $("#quantiteTrottinette"+nbDiv+"").remove();
    $("."+nbDiv+"").append("<div id='quantiteTrottinette"+nbDiv+"'><select id="+productSplit+"><option></option></select></div>");
    client.query("SELECT quantite FROM trottinette WHERE model=\'"+product+"\'",(err,res)=>{
        if (err) { console.error(err); return; }
        else{
            for(var i =0;i < res.rows.length;i++){
                let item = res.rows[i];
                let quantite = item['quantite'];
                for(var i =0;i < quantite ;i++){
                    var nbProduct = i + 1
                    $("#"+productSplit+"").append("<option>"+nbProduct+"</option>");
                }
            }  
        }
    })
};

function quantiteAccessoire(sel){
    var product = sel.options[sel.selectedIndex].text
    var productSplit = product.split(' ').join('');
    var nbDiv = sel.id
    $("#quantiteAccessoire"+nbDiv+"").remove();
    $("."+nbDiv+"").append("<div id='quantiteAccessoire"+nbDiv+"'><select id="+productSplit+"><option></option></select></div>");
    client.query("SELECT quantite FROM accessoire WHERE model=\'"+product+"\'",(err,res)=>{
        if (err) { console.error(err); return; }
        else{
            for(var i =0;i < res.rows.length;i++){
                let item = res.rows[i];
                let quantite = item['quantite'];
                for(var i =0;i < quantite ;i++){
                    var nbProduct = i + 1
                    $("#"+productSplit+"").append("<option>"+nbProduct+"</option>");
                }
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

