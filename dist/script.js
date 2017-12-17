// Code goes here

function validateForm() {
  var contact = document.getElementById("contact");
  var tel = document.getElementById("tel");
  if(contact.value === ""){
    Materialize.toast('Complete el campo contacto!', 4000);
  }
  else if(tel.value === ""){
    Materialize.toast('Complete el campo telefono!', 4000);
  }
  else if(isNaN(tel.value)){
    Materialize.toast('El campo Telefono solo debe contener numeros!', 4000);
  }
  else{
    generateComment();
  }
}

function generateComment() {
  var separator = " // ";
  var comment = document.getElementById("comment");
  var symptom = "Falla: " + document.getElementById("symptom").value + " ";

  comment.value = getContactAndPhone() + horarios.horarioDesde + horarios.horarioHasta + symptom + getPdlaState();

  var copyText = document.getElementById("comment");
  copyText.select();
  document.execCommand("Copy");
  Materialize.toast('Copiado!', 4000,'',function(){
    desdeBtn.innerHTML = "Horario Desde";
    hastaBtn.innerHTML = "Horario Hasta";
  })
  generateTable(comment.value)
}

function generateTable(comment) {
  var desvio = document.getElementById("desvio")
  var bono = document.getElementById("bono")
  var reiterado = document.getElementById("reiterado")
  var table = document.getElementById("tableBody")
  var tableRow = document.createElement("tr")
  var commentDetail = document.createElement("td")
  var desvioDetail = document.createElement("td");
  var bonoDetail = document.createElement("td");
  var reiteradoDetail = document.createElement("td");
  var horaDetail = document.createElement("td")
  var commentContent = document.createTextNode(comment)
  var desvioContent
  var bonoContent
  var reiteradoContent
  if(desvio.checked){
    desvioContent = document.createElement("i")
    desvioContent.setAttribute("class", "fa fa-check")
    desvioContent.setAttribute("aria-hidden", "true")
  } else {
    desvioContent = document.createElement("i")
    desvioContent.setAttribute("class", "fa fa-times")
    desvioContent.setAttribute("aria-hidden", "true")
  }

  if(bono.checked) {
    bonoContent = document.createElement("i")
    bonoContent.setAttribute("class", "fa fa-check")
    bonoContent.setAttribute("aria-hidden", "true")
  } else {
    bonoContent = document.createElement("i")
    bonoContent.setAttribute("class", "fa fa-times")
    bonoContent.setAttribute("aria-hidden", "true")
  }

  if(reiterado.checked) {
    reiteradoContent = document.createElement("i")
    reiteradoContent.setAttribute("class", "fa fa-check")
    reiteradoContent.setAttribute("aria-hidden", "true")
  } else {
    reiteradoContent = document.createElement("i")
    reiteradoContent.setAttribute("class", "fa fa-times")
    reiteradoContent.setAttribute("aria-hidden", "true")
  }
  var hora = document.createTextNode(generateDate())
  table.appendChild(tableRow)
  tableRow.appendChild(commentDetail)
  tableRow.appendChild(desvioDetail)
  tableRow.appendChild(bonoDetail)
  tableRow.appendChild(reiteradoDetail)
  tableRow.appendChild(horaDetail)
  commentDetail.appendChild(commentContent)
  horaDetail.appendChild(hora)
  desvioDetail.appendChild(desvioContent)
  bonoDetail.appendChild(bonoContent)
  reiteradoDetail.appendChild(reiteradoContent)
  console.log(comment);
  console.log(desvioContent);
  console.log(generateDate())
}

function generateDate() {
  var date = new Date()
  var hour = date.getHours()
  var min = date.getMinutes()
  if(min < 10) {
    min = "0" + date.getMinutes();
  } else {
    date.getMinutes()
  }
  return hour + ":" + min;
}

function getContactAndPhone() {
  var contact = "Contacto: " + document.getElementById("contact").value;
  var tel = "Telefono: " + document.getElementById("tel").value;
  return contact + " // " + tel + " // "
}

function getPdlaState() {
  var noOk = document.getElementById("no");
  var pdlaOk = document.getElementById("yes");
  var noPos = document.getElementById("nopos");
  if(pdlaOk.checked) {
    return "// Pdla: Ok ";
  } else if(noOk.checked) {
    return "// Pdla: No ok ";
  } else if(noPos.checked) {
    return "// Pdla: No posible ";
  } else {
    return "// Pdla: N/A ";
  }
}

var horarios = {

  horarioDesde : "",
  horarioHasta : "",

  onDesdeClick: function (event) {
      var desdeBtn = document.getElementById("desdeBtn");
      if(event.target.parentNode.nodeName === "UL") {
        this.horarioDesde = "Desde: " + event.target.id;
        desdeBtn.innerHTML = event.target.id;
      }
    },

  onHastaClick:  function (event) {
      var hastaBtn = document.getElementById("hastaBtn")
      if(event.target.parentNode.nodeName === "UL") {
        this.horarioHasta = " Hasta: " + event.target.id + " // ";
        hastaBtn.innerHTML = event.target.id;
      }
    }
}


var btn = document.getElementById("btn");
btn.addEventListener("click", validateForm);

var desde = document.getElementById("desde");
desde.addEventListener("click", horarios.onDesdeClick.bind(horarios));

var hasta = document.getElementById("hasta");
hasta.addEventListener("click", horarios.onHastaClick.bind(horarios));

// Code below this line is only for initialization of the MaterializeCSS components

  $('.dropdown-button').dropdown();

    $(document).ready(function() {
    $("#symptom").material_select();
  });