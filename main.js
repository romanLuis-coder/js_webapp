//Calculadora de cryptomonedas//


//Declaración de variables 
let montoEnpesos = [];
let monedaSeleccionada; 
let monedas; 
let datosCrypto=[]; 
let datosBlue=[]; 
let cont =0;
let paralelo; 
let contenedor = document.createElement("div"); 
let container2 = $(document.createElement("div"));


//LLamada a API de crypto 

$.ajax({
  url: 'https://api.coinlore.net/api/tickers/?start=0&limit=10',
  dataType: 'json',
  method:'GET',
  success: function(datico) {
    llamadoApi(datico.data);
    datosCrypto = datico.data;
    
    for (let i =  0; i < datosCrypto.length; i++) {
        $("#coins").append('<option value=' + i + '>' + datosCrypto[i].symbol + ' - '+datosCrypto[i].price_usd +'</option>');
    }
    
    $("#info1").append(`<div class="shadow card border-warning mb-3" style="max-width: 18rem;">
    <div class="card-header text-center"> Datos BTC</div>
    <p class="card-text text-center"><b>Precio, BTC : ${datosCrypto[0].price_usd} US$</b></p>
    <p class="card-text text-center"><b>Variación (7d): (${datosCrypto[0].percent_change_7d}%)</b></p>
    <p class="card-text text-center"><b>Capitalización de mercado : ${Number(datosCrypto[0].market_cap_usd).toLocaleString('es-MX')} US$</b></p>
    </div>`);
       
    $("#info1").append(contenedor); 
     
  }
});

// API dolar blue

$.ajax({
    url: 'https://api.bluelytics.com.ar/v2/latest',
    dataType: 'json',
    method:'GET',
    success: function(data) {
      llamadoBlue(data.blue);
      datosBlue = data.blue;
      $("#info2").append(`<div class="shadow card border-primary mb-3" style="max-width: 18rem;">
    <div class="card-header text-center"> Precio del dolar Blue</div>
    <p class="card-text text-center"><b>Precio venta : ${datosBlue.value_sell} pesos</b></p>
    <p class="card-text text-center"><b>Precio compra : ${datosBlue.value_buy} pesos</b></p>
    <p class="card-text text-center"><b>Precio promedio : ${datosBlue.value_avg} pesos</b></p>
    </div>`);
    
   
    $("#info2").append(contenedor); 
    }
  });

// API Analisis tecnico

$.ajax({
    url: 'https://finnhub.io/api/v1/scan/pattern?symbol=BITFINEX:BTCUSD&resolution=D&token=c2gpv3qad3ic4qabtpug',
    dataType: 'json',
    method:'GET',
    success: function(datos) {
   
    llamadoTech(datos.points[0])
    datosTech=datos.points[0];
    let tendenciaSemanal
    if(datosTech.patterntype == "bearish"){
        tendenciaSemanal = "Bajista"
    }
    else{
        tendenciaSemanal = "Alcista"
    }; 
     
    $("#info3").append(`<div class="shadow card border-warning mb-3" style="max-width: 18rem;">
    <div class="card-header text-center"> Analisis técnico BTC</div>
    <p class="card-text text-center"><b>Patron técnico: ${datosTech.patternname} </b></p>
    <p class="card-text text-center"><b>Tendencia (Diaria): ${tendenciaSemanal}</b></p>
    </div>`);
     
    $("#info3").append(contenedor);     
    }
  });

  $.ajax({
    url: 'https://finnhub.io/api/v1/scan/pattern?symbol=BITFINEX:ETHUSD&resolution=W&token=c2gpv3qad3ic4qabtpug',
    dataType: 'json',
    method:'GET',
    success: function(datos) {
   
    llamadoTech(datos.points[0])
    datosTech=datos.points[0];
    let tendenciaSemanal
    if(datosTech.patterntype=="bearish"){
        tendenciaSemanal = "Bajista"
    }
    else{
        tendenciaSemanal = "Alcista"
    }; 
     
    $("#info4").append(`<div class="shadow card border-warning mb-3" style="max-width: 18rem;">
    <div class="card-header text-center"> Analisis tecnico ETH</div>
    <p class="card-text text-center"><b>Patron tecnico: ${datosTech.patternname} </b></p>
    <p class="card-text text-center"><b>Tendencia (Semanal): ${tendenciaSemanal}</b></p>
    </div>`);
     
    $("#info4").append(contenedor);     
    }
  });

// Selectores

$("#btnCalcular").click(calcularCrypto); 

$(document).ready(function(){
    $("select.form-select").change(function(){
        monedaSeleccionada= $(this).children("option:selected").val();
    });
});

// Declaracion de funciones 

function llamadoApi(m){
    monedas = m;    
}
function llamadoBlue(n){
    paralelo =n; 
}

function llamadoTech(o){
    tecnico =o; 
}

function calcularCrypto(){
    cont++; // agregar contador
    montoEnpesos= $("#cantidadBtc").val();

    if(!monedaSeleccionada){
        swal("Elige una moneda de la lista");
        return false;
    }

    if(montoEnpesos <= 0){
        swal("Introduce montos válidos", "¡mayores a cero!");
        return false;
    }

    if(monedas[monedaSeleccionada].symbol == "BTC"){
        resultado2 = ((montoEnpesos/(monedas[0].price_usd*datosBlue.value_sell))/ 0.00000001).toFixed(3);
    }

    resultado=(montoEnpesos/(monedas[monedaSeleccionada].price_usd*(datosBlue.value_sell))).toFixed(4);
    

    // Ahora cada nuevo elemento creado tendra un id tarjeta-1, tarjeta-2, tarjeta-3, etc para poder eliminar despues
    
    if(monedas[monedaSeleccionada].symbol == "BTC"){
        $("#crypto2").append(`
        <div id="tarjeta-${cont}" class="row text-center">
            <div class="card text-white bg-secondary mb-3" style="max-width: 15rem;">${monedas[monedaSeleccionada].name}</div>
            <div class="col-sm text-center" id="paragraph1"><b>${resultado} (${resultado2} sats)</b></div>
            <div class="col-sm text-center" id="paragraph1"><b><button class="btn btn-danger btn-sm" type="button" onClick="deleteCoinList(${cont})">x</button></b></div>
    </div>`);

    $('#main').after(crypto2);
    }else{$("#crypto2").append(`
    <div id="tarjeta-${cont}" class="row text-center">
        <div class="card text-white bg-secondary mb-3" style="max-width: 15rem;">${monedas[monedaSeleccionada].name}</div>
        <div class="col-sm text-center" id="paragraph1"><b>${resultado} </b></div>
        <div class="col-sm text-center" id="btnBorrar"><b><button class="btn btn-danger btn-sm" type="button" onClick="deleteCoinList(${cont})">x</button></b></div>
</div>`);

$('#main').after(crypto2);


    }
};

function deleteCoinList(v){
    // Recibe el contador para eliminar las últimas cotizaciones
    $('#tarjeta-'+v).remove();
}

$("#crypto2").append(container2);

//Animaciones

$( "#perrito" ).hover(function() {
    $( this ).fadeOut( 150 );
    $( this ).fadeIn( 600 );
  });

