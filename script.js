var city = []
var info
var tempNowInC
var tempNowInF
var tempMaxInC
var tempMaxInF
var tempMinInC
var tempMinInF
var comment


transformTemp = function () {
  tempNowInC = info.main.temp-273.15;
  tempNowInF = (tempNowInC*1,8)+32;
  tempMinInC = info.main.temp_min-273.15;
  tempMinInF = (tempMinInC*1,8)+32;
  tempMaxInC = info.main.temp_max-273.15;
  tempMaxInF = (tempMaxInC*1,8)+32;
postWeather();
}

postWeather = function () {
  $('.printout').append('<h3>' + info.name + '<a href="#" class="del-item" role="button"><i class="fa fa-trash-o" aria-hidden="true"></i></a></h3>');
  $('.printout').append('Generally there will be ' + info.weather[0].main + ', ' + info.weather[0].description + '<br>');
  $('.printout').append('NOW: <i class="fa fa-thermometer-half" aria-hidden="true"></i>' + tempNowInC + ' °C / ' + tempNowInF + '°F <br>');
  $('.printout').append('Min: <i class="fa fa-thermometer-full" aria-hidden="true"></i>' + tempMinInC + ' °C / ' + tempMinInF + '°F <br>');
  $('.printout').append('Max: <i class="fa fa-thermometer-empty" aria-hidden="true"></i>' + tempMaxInC + ' °C / ' + tempMaxInF + '°F <br>');
  $('.printout').append('Wind: ' + info.wind.speed + ' km/h <br>')
  $('.printout').append('Humidity: ' + info.main.humidity + '% <br>');
  $('.printout').append('Pressure: ' + info.main.pressure + ' mmHg <br>');

  var rand = Math.random()

  if (rand < 0.3333) {
    $('.printout').append('But... Who cares about ' + info.name + '?')
  } else if (rand <0.66666) {
    $('.printout').append('Get dressed properly!')
  } else {
    $('.printout').append("There will be brighter days... don't worry")
  }

  $('.printout').append('<br><input type="text" class="comment" placeholder="Comment"> <button type="button" class="btn2 btn-primary post-comment"> Post Comment </button><br><div class="posted-comments"><ul></ul></div>')

  $('.btn2').click(function() {
    comment = $('.comment').val()
    $('.posted-comments').append(comment + '<br>')
  })
}


$(".btn").click(function() {
  city.push($('.city-input').val());
  updateCities();
})

updateCities = function () {
  $('.printout').empty()
for (i=0; i<city.length; i++) {
  $.ajax({
  method: "GET",
  url: ('http://api.openweathermap.org/data/2.5/weather?q=' + city[i] + '&appid=d703871f861842b79c60988ccf3b17ec'),
  dataType: "json",
  success: function(data) {
    info = data;
    transformTemp();
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
  }
  });
}
}