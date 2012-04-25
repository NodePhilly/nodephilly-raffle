var EventBrite = require('eventbrite');

exports.index = function(req, res) {
	res.render('index', {
		title: 'Node.Philly Raffle'
	});
};

exports.attendees = function(req, res) {
  var app_key = process.env.EVENTBRITE_APP_KEY;
  var user_key = process.env.EVENTBRITE_USER_KEY;

  var client = EventBrite({
  	app_key : app_key,
  	user_key : user_key
  });

  client.event_list_attendees({ 'id': 3020647839 /* Node.Philly 2012 */ }, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
};