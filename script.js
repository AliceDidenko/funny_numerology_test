let firstname = 0;
let data = 0;
let day = 0;
let month = 0;
let year = 0;
let maxnumber = 0;
let now = new Date();
let text = String(now);

// фильтры для input с помощью регулярных выражений
$(document).ready(function() {
  $('#data_input').bind("change keyup input click", function() { 
    if (this.value.match(/[^0-9]|\s/g)) {
      this.value = this.value.replace(/[^0-9]|\s/g, '');
    }
  });
});
$(document).ready(function() {
  $('#maxnumber_input').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]|\s/g)) {
      this.value = this.value.replace(/[^0-9]|\s/g, '');
    }
  });
});
$(document).ready(function() {
  $('#firstname_input').bind("change keyup input click", function() {
    if (this.value.match(/[^а-яА-Яa-zA-Z]|\s/g)) {
      this.value = this.value.replace(/[^а-яА-Яa-zA-Z]|\s/g, '');
    }
  });
});
// конец фильтров для input

function nameFunction(){
  firstname = document.getElementById("firstname_input").value;
  return firstname;
}
function dataFunction(){ 
  data = document.getElementById("data_input").value;
  return data;
}
function maxFunction(){
  maxnumber = document.getElementById("maxnumber_input").value;
  return maxnumber;
}

// проверка даты
function datecheck(d, m, y, ny) {
  d = Number(d);
  m = Number(m);
  y = Number(y);
  ny = Number(ny);
  if (d < 32 && m < 13 && ny-y > 15 && ny-y < 30) {
    if ((d == 31) && ( m!=1 || m!=3 || m!=5 || m!=7 || m!=8 || m!=10 || m!=12 )) { return false; }
    if ((m == 2) && (d > 28)) {
      if (d == 30) { return false; }
      if (d == 29 && ((2000 - y)%4 != 0)) { return false; }
    }
    return true
  } else {
    return false;
  }
}
//конец проверки даты

// вычисление номера билета
function randomInteger(min, max) { // случайное число
  min = Number(min);
  max = Number(max);
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function simplification(str, max) { // упрощение
  let sum = 0;
  for (i in str) {
    sum += Number(str[i]);
  }
  return String(sum);
}
function number_hrenamber (fn, d, m, y, maxn) { // вычисление номера
  let answer;
  let newfn = String(fn.length);
  let arr = [newfn, d, m, y];
  arr[4] = randomInteger(Number(1), Number(maxn));
  for (i in arr) {
    if (Number(arr[i]) > Number(maxn)) {
      while (Number(arr[i]) > Number(maxn)) {
        arr[i] = simplification(arr[i], maxn);
      }
    }
  }
  answer = randomInteger(0, 4);
  return Number(arr[answer]);
}
// конец вычисления номера

$( function(){

  $("#button_input").click( function(){
    firstname = nameFunction();
    data = dataFunction();
    day = data.slice(0,2);
    month = data.slice(2,4);
    year = data.slice(4);
    maxnumber = maxFunction();

    if (firstname && month && maxnumber) {
      if (datecheck(day, month, year, now.getFullYear())) {
        document.getElementById("answer_user").innerHTML = "твой счастливый билет" + "<br>" + number_hrenamber(firstname, day, month, year, maxnumber);
        // document.getElementById("answer_user").innerHTML += firstname;
        // let data_obj = {};
        // data_obj.firstname = firstname;
        // data_obj.day = day;
        // data_obj.month = month;
        // data_obj.year = year;
        // data_obj.maxnumber = maxnumber;
        // let time_obj = {};
        // time_obj.nowDay = now.getDate();
        // time_obj.nowMonth = Number(now.getMonth())+1;
        // time_obj.nowYear = now.getFullYear();
        // time_obj.nowHours = now.getHours();
        // time_obj.nowMinutes = now.getMinutes();

        // let str_data_obj = JSON.stringify(data_obj);
        // let str_time_obj = JSON.stringify(time_obj);
        // console.log(str_data_obj);
        // console.log(str_time_obj);

      } else {
        document.getElementById("answer_user").innerHTML = "врунишка-шалунишка," + "<br>" + "попробуй снова";
      }
    } else {
      document.getElementById("answer_user").innerHTML = "халявы не будет!";
    }

    $("#answer_div").slideToggle(2);

  });
});