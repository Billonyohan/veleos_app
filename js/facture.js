function nbProduct(sel) {
    console.log(sel)
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
        $("#"+nbDiv+"").append("<div class='containerVelo"+nbDiv+"'><select id='modelVelo"+nbDiv+"'  onChange='colorProduct(this);'><option></option></select></div>")
        client.query('SELECT model FROM core_velo ORDER BY model DESC',(err,res)=>{
            if (err) { console.error(err); return; }
            else{
                for(var i =0;i < res.rows.length;i++){
                    var item = res.rows[i];
                    var model = item['model'];
                    $("#modelVelo"+nbDiv+"").append("<option>"+model+"</option>");
            }
        }
        })
    }
};

function colorProduct(sel) {
    var typeOfProduct = sel.options[sel.selectedIndex].text
    var nbDiv = sel.options[sel.selectedIndex].value
    $(".containerVelo"+nbDiv+"").remove();
    $("#"+nbDiv+"").append("<div class='containerVelo"+nbDiv+"'><select id='colorVelo"+nbDiv+"'><option></option></select></div>")
    client.query('SELECT * FROM core_velo',(err,res)=>{
        if (err) { console.error(err); return; }
        else{
            for(var i =0;i < res.rows.length;i++){
                var item = res.rows[i];
                var color = item['color'];
                $("#modelVelo"+nbDiv+"").append("<option>"+color+"</option>");
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

