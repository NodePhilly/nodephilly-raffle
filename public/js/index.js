var attendees = [];

var nameLabel;
var companyLabel;
var nameInterval;

function shuffle(arr) {
  for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
  return arr;
}

function getRandomAttendee() {
   var randVal = Math.random()*attendees.length;
   return attendees[Math.round(randVal)-1];
}

$(document).ready(function() {
  $.get('/attendees', function(result) {
    for (var i=0; i<result.attendees.length; i++) {
      if (   result.attendees[i].attendee.company.toLowerCase() != 'chatham financial'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'geeklist'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'couchbase'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'zivtech'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'comcast'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'comcast labs'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'voltdb'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'saucelabs'
      	  && result.attendees[i].attendee.company.toLowerCase() != '&yet'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'nodejitsu'
      	  && result.attendees[i].attendee.company.toLowerCase() != '10gen'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'uber'
      	  && result.attendees[i].attendee.company.toLowerCase() != 'voxer') {
		attendees.push({
      	  name: result.attendees[i].attendee.first_name + ' ' + result.attendees[i].attendee.last_name,
      	  company: result.attendees[i].attendee.company
        });
      }      
    }

    shuffle(attendees);

    nameInterval = setInterval(nextName, 100);
  });

  nameLabel = $('#name');
  companyLabel = $('#company');

  $('#stop').click(function() {
    clearInterval(nameInterval);
  });
});

function nextName() {
  var attendee = getRandomAttendee();

  if (attendee) {
    nameLabel.text(attendee.name);
    companyLabel.text(attendee.company);
  }  
};