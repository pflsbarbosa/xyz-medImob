
function fullYear() {
  var d = new Date();
  var dy = d.getFullYear();
  var dm = d.getMonth()+1;
  var dday =d.getDate();
  document.getElementById("copyright").innerHTML = "© " + dy+"/"+dm+"/"+dday + " Paulo Barbosa";
}


function myfunction (){
  alert("Resulta!");
}
function redirect_Comprar() {
  location.replace("public/propertySearch.html")
}
function redirect_Vender() {
  location.replace("public/raisingTheProperty.html")
}
function redirect_Recrutar() {
  location.replace("public/recruitment.html")
}
