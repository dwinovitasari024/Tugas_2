let dataBar = []; //buat  variabel global
let dataPie = [2756, 234,435,5456];
let colors = ['red','blue','pink','yellow']
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsLZOW_yPZ0gsuFsGH7sFNxZ6YDgGiiHl8NLzRK0rgnz61Nhl6ErDJtu1iD1gQi9H6vlFsyl7nP9JP/pub?output=csv';
let urlAPI = 'https://api.openweathermap.org/data/2.5/weather?q=LAMPUNG&appid=435e0190736a6e889041182719ef5101&units=metric';


let dataSheet;
let dataAPI;
let xdata;
let ydata;


function preload(){
 dataSheet = loadTable(url, 'csv', 'header');
 dataAPI = loadJSON(urlAPI);
}




function barPlot(dataBar){

 stroke(0,255,0);
 fill('blue');
 var maxBar = max(dataBar);
 var w = (windowWidth/2) / dataBar.length;
 for (var i=0; i<dataBar.length;i++){
 var dat = map(dataBar[i], 0, maxBar, 0, windowHeight/2 )
 rect(i*w, windowHeight/2 - dat, w, dat)

 }
}

function persentase(arr){
   var tot = 0;
   for (var i=0; i<arr.length;i++){
   tot = tot + arr[i]
   }

   var per = []
   for (var i=0; i<arr.length;i++){
   per[i] = arr[i] / tot
   }
   return per
}

function piePlot(dataPie){
   let diameter = windowHeight / 3;
   let lastAngle = 0;
   var dataPer = persentase(dataPie);
   strokeWeight(4);
   for (let i = 0; i < dataPer.length; i++) {
   var angles = dataPer[i] * 360;
   fill(colors[i])
   arc(
   windowWidth * 3 / 4,
   windowHeight * 1 / 4,
   diameter,
   diameter,
   lastAngle,
   lastAngle + radians(angles)
   );
   lastAngle += radians(angles);
   }
}

function linePlot(xdata, ydata){
   var maxX = max(xdata);
   var minX = min(xdata);
   var maxY = max(ydata);
   var minY = min(ydata);
   var w = (windowWidth/2) / (xdata.length-1);
   for (var i=0; i < xdata.length; i++){
     var x1 = map(xdata[i],
                   minX,
                   maxX,
                   0,
                   windowWidth/2 );
   var x2 = map(xdata[i+1],
                 minX,
                 maxX,
                 0,
                 windowWidth/2 );
   var y1 = map(ydata[i],
                 minY,
                 maxY,
                 0,
                 windowHeight/2 );
   var y2 = map(ydata[i+1],
                 minY,
                 maxY,
                 0,
                 windowHeight/2 );

   line(i*w,
   windowHeight - y1,
   (i+1)*w,
   windowHeight - y2);
   ellipse(i*w,
           windowHeight - y1,
   10,
   10)
   }
}

function infoCuaca(x, y, data, fontsize){
    textSize(fontsize)
    fill('white')
    stroke("white")
    text(data.name,
    posX = x,
    posY = y)
    text("Cuaca = "+ data.weather[0].main,
    posX = x,
    posY = y + fontsize)
    text("Suhu = "+ data.main.temp,
    posX = x ,
    posY = y + 2*fontsize)
    text("Kecepatan angin = "+ data.wind.speed,
    posX = x,
    posY = y + 3*fontsize)
   }



function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 100; i++){
        dataBar[i] = random(0,100);
    }
  
  xdata = dataSheet.getColumn('x');
  ydata = dataSheet.getColumn('y');
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(20);
    stroke(255,255,255);
    strokeWeight(1);
    line(windowWidth/2, 0, windowWidth/2, windowHeight);
    line(0, windowHeight/2, windowWidth, windowHeight/2);
    barPlot(dataBar);
    piePlot(dataPie);
    linePlot(xdata,ydata)
    infoCuaca(
        windowWidth * 3 / 5,
        windowHeight * 3 / 4,
        dataAPI,
        windowWidth/40
    )
    
}