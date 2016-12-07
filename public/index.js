var countries = [];

var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  var selectBox = document.querySelector('select');
  makeRequest(url, requestComplete);
  selectBox.onchange = displaySelected;
  // var saved =localStorage.getItem('selection');
  // setCountryDataText(saved);
  // var savedCountry = document.querySelector('#country-data');
  // var state = JSON.parse(localStorage.getItem('savedItem')) || [];
}

var makeRequest = function(url, callback) {
  //Create a new XMLHHTP request.
  var request = new XMLHttpRequest();
  //Open the request, and tell it what method(HTTP i.e. GET) to use.
  request.open('GET', url);
  //set the callback we want the 'request' object to run when complete
  request.onload = callback;
  //send the request
  request.send();
}

var requestComplete = function() {
  console.log('success');
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  // console.log(jsonString);
  countries = JSON.parse(jsonString);
  populateList(countries);
}

var populateList = function(countries) {
  var selectBox = document.querySelector('select');
  var savedCountry = localStorage.getItem('savedCountry')
  for (var i = 0; i < countries.length; i++) {
    if (savedCountry === countries[i].name) {
      var option = document.createElement('option')
      option.selected = true;
    }
    else {
      var option = document.createElement('option');
    }
    option.innerText = countries[i].name;

    console.log(option)
    option.value = i; 
    selectBox.append(option);
  }
}

var displaySelected = function( event ) {
  var country = findCountryByIndex( event.target.value );
  var display = document.getElementById('country-data');
  display.innerText = ("Country Name: " + country.name + '\nPopulation: ' + country.population + '\nCapital City: ' + country.capital);
  save( country.name );
  // save(display.innerText)
  // console.log(event.target.value)
}

var findCountryByIndex = function(index) {
 return countries[index]
}

// var save = function(item) {
//   // var savedItem = JSON.parse(localStorage.getItem('savedItem')) || [];
//   // savedItem.push(item);
//   localStorage.setItem('savedCountry', JSON.stringify(savedItem));

//   console.log(savedItem);
//   console.log(savedCountry);
// }

var save = function(item) {
  console.log(item)
  localStorage.setItem('savedCountry', item);
}

var setCountryDataText = function(displaySelected) {
  var display = document.querySelector('#country-data')
  display.innerText = displaySelected;
}

window.onload = app;



// var populateList = function(countries) {
//   var ul = document.getElementById('country-list');
//   countries.forEach(function(country) {
//     var li = document.createElement('li');
//     li.innerText = (country.name);
//     ul.append(li);
//   });
// }