
function fullYear() {
  var d = new Date();
  var dy = d.getFullYear();
  var dm = d.getMonth()+1;
  var dday =d.getDate();
  document.getElementById("copyright").innerHTML = "© " + dy+"/"+dm+"/"+dday + " Paulo Barbosa";
}
