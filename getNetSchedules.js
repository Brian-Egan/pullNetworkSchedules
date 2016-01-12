// Parse the Discovery network schedule site and return the TV schedule


// The problem right now is that this doesn't account for marathon blocks, which are formatted to not have "minutes" and lump a group of content together. I don't have the itme right now to investigate further.

function parseSched() {
  var schedule = {};
  var days = document.getElementsByClassName('current-day');

  // Here we'd iteratre through each day..

  var todaysDate = new Date();
  var dd = todaysDate.getDate();
  var mm = todaysDate.getMonth()+1; //January is 0!
  var yyyy = todaysDate.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  todaysDate = yyyy + "/" + mm+'/'+dd;

  var dates = [todaysDate];
  var datesMenu = document.getElementsByClassName('daytue');
  for (date in datesMenu) { 
    if (parseInt(date)) { 
      dates.push(datesMenu[date].getAttribute('data-ldate')) 
    }
  };

  // var daysData = doc /ument.

  for (dateIndex in dates) {
    var day = days[dateIndex];
    var thisDate = dates[dateIndex]
    if (day != null) {
      console.log("day is ... " + day )
      shows = day.getElementsByClassName('data');
      schedule[thisDate] = [];

      // now we'd iterate through the shows.
      for (i in shows) {
        show = {};
        s = shows[i];
        if (s.constructor.name == "HTMLDivElement") {
          console.log("Day: " + day + "  -  s is " + s + " A type..." + s.constructor.name);
          minute = s.getElementsByClassName('minute')[0].innerHTML;
          hour = s.getElementsByClassName('hour')[0].innerHTML;
          dayhalf = s.getElementsByClassName('dayhalf')[0].innerHTML;
          if (dayhalf == "pm") {
            hour = (parseInt(hour) + 12);
          }
          show['airtime'] = new Date(hour + ":" + minute + ":00 " + thisDate); 
          show['series'] = s.getElementsByClassName('name')[0].getElementsByTagName('span')[1].innerHTML.trim();
          show['episode'] = s.getElementsByClassName('name')[0].getElementsByTagName('span')[1].innerHTML.trim();
          schedule[thisDate].push(show);
        }
      }
    }
  }

  return schedule
}
