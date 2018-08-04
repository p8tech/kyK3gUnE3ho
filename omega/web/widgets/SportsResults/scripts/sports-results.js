// settings
var i18nPath = '/locales/__lng__.json';
var isoCode = 'en';

var sportsCodeList =  [
  'FOOT'
];

var hideLoading = function () {
  $('#loader').fadeOut();
};

var showLoading = function () {
  $('#loader').fadeIn();
};

var hideForm = function () {
  $('#submit_filter').hide();
}

var showForm = function () {
  $('#submit_filter').show();
}

var hideResults = function () {
  $('#results').hide();
}

var showResults = function () {
  $('#results').show();
}

var updateTranslation = function() {
  $('.translate-text').each(function() {
    var translatedText = i18n.t($(this).data('content')) || "";

    $(this).text(translatedText);
  });
}

var loadSports = function() {
  var options = {};
  for (var i = 0; i < sportsCodeList.length; i++) {
    $('#sports-list').append($('<option>', {
        value: sportsCodeList[i],
        text: i18n.t('sportCode.'+sportsCodeList[i].toLowerCase())
    }));
  }
}

function validate_date() {
  var filter      =   $("input[name=optionsRadios]:checked").val();
  var filterfrom  =   $("#datepicker-from").val();
  var filterto    =   $("#datepicker-to").val();
  var dateFrom = '';
  var dateTo = '';
  
  if(filter === 'daterange')
  {
    if((filterfrom == '') || (filterto == ''))
    {
      alert(i18n.t('sports-results.date-range-error'));
      return false;
    } else {
      dateFrom = filterfrom;
      dateTo = filterto;
    }
  } else {
    if (filter === 'today') {
      dateFrom = moment().format('YYYY-MM-DD');
      dateTo = moment().format('YYYY-MM-DD');
    } else if (filter === 'yesterday') {
      moment().subtract(1,'d')
      dateFrom = moment().subtract(1,'d').format('YYYY-MM-DD');
      dateTo = moment().subtract(1,'d').format('YYYY-MM-DD');
    } else if (filter === 'last3days') {
      dateFrom = moment().subtract(3,'d').format('YYYY-MM-DD');
      dateTo = moment().format('YYYY-MM-DD');

    } else {
      // last week
      dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
      dateTo = moment().format('YYYY-MM-DD');
    }
  }
  return {
    'dateFrom' : dateFrom  + 'T00:00:00.000+0800',
    'dateTo' : dateTo + 'T23:59:59.000+0800'
  };
}

var getPeriods = function(periods) {
  var arrPeriods = [];

  for (var i = 0; i < periods.length; i++) {
    if (periods[i].id !== 100) {
      if (periods[i].score.result) {
        var result = periods[i].score.result
        var score = result.split(' - ')
        arrPeriods.push( {
          id: i18n.t('sports-results.'+periods[i].id),
          scoreA : score[0],
          scoreB : score[1],
          winnerA : (score[0] > score[1]),
          winnerB : (score[1] > score[0]),
        })
      }
      
    } 
  }

  return arrPeriods
}

var getEvents = function(country) {
  var events = country.events;
  var content = '';

  for (var i = 0; i < events.length; i++) {
    var opponentA = events[i].opponentA || {};
    var opponentB = events[i].opponentB || {};
    var scoreA = opponentA.score || 0;
    var scoreB = opponentB.score || 0;
    var periods = getPeriods(events[i].periods);

    if (opponentA.description && opponentB.description) {
      var data = {
        eventDate : moment(events[i].startDateTime).format('DD/MM YYYY hh:mm a'),
        opponentA : opponentA.description,
        winnerA : (scoreA > scoreB),
        scoreA : scoreA,
        opponentB : opponentB.description,
        winnerB : (scoreB > scoreA),
        scoreB : scoreB,
        periods: periods,
        periodCount: periods.length,
        "score-unavailable" : i18n.t('sports-results.score-unavailable')
      }
      var rowContent = Templates['results-entry'](data);
      content += rowContent;
    }    
  }
  return new Handlebars.SafeString(content);
}

var processSportsResults = function(url, sportsCode) {
  showLoading();
  hideForm();
  // change language
  $('#results .sport-title p').html(i18n.t('sportCode.'+sportsCode.toLowerCase()));
  $('#results .header-date').html(i18n.t('sportCode.header-date'));
  $('#results .header-date').html(i18n.t('sportCode.header-event'));


  MIFY.get(url , function(data) {
    // empty result container
    $('#results .results-div').empty();

    if (data.length > 0) {
      var resultsDetail = data[0];
      var countryDetails = resultsDetail.results;
      var countryContent = [];

      countryDetails = countryDetails.sort(function(a, b){ 

        var eventPathsA0 = a.eventPaths[0] || {};
        var eventPathsA1 = a.eventPaths[1] || {};

        var eventPathsB0 = b.eventPaths[0] || {};
        var eventPathsB1 = b.eventPaths[1] || {};


        var titleA = eventPathsA0.description + ' : ' + eventPathsA1.description;
        var titleB = eventPathsB0.description + ' : ' + eventPathsB1.description;
        if ( titleA < titleB ) {
          return -1;
        }
        if ( titleA > titleB ) {
          return 1;
        }
        return 0;
      }); //sort according to Country title
      $('#results .sport-title p').html(resultsDetail.description)
      for (var i = 0; i < countryDetails.length; i++) {
        var country = countryDetails[i];

        var content = getEvents(country);

        var eventPath0 = country.eventPaths[0] || {};
        var eventPath1 = country.eventPaths[1] || {};


        if (eventPath0.description && eventPath1.description && content) {
          $('#results .results-div').append(Templates['country']({
            'title' : eventPath0.description + ' : ' + eventPath1.description,
            'content' : content
          }));
        }
      }

      showResults();
      hideLoading();
    } else {
      // no data
      $('#results .results-div').html('<div class="not-avail">'+i18n.t('sports-results.no-available-match')+'</div>');
      showResults();
      hideLoading();
    }

  }, function (xhr) {
    // empty result container
    $('#results .results-div').empty();

    $('#results .results-div').html('<div class="not-avail">'+i18n.t('sports-results.server-error')+'</div>');

    showResults();
    hideLoading();
  });
};

//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {  

  // get querystring
  MIFY.LINE_ID = getParameterByName('lineId') || 2;
  MIFY.ORIGIN_ID = getParameterByName('originId') || 3;

  $('#results').on('click', '.show-div', function(e) {
    e.preventDefault();
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find('div .inner-show').removeClass('show');
      $this.parent().parent().find('div .inner-show').slideUp(350);
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
    }
  });
  $('#back-button').click(function()
  {

    showForm();
    hideResults();
      
  });

  $( "#datepicker-from" ).datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function(selected) {
      jQuery("#datepicker-to").datepicker("option","minDate",selected)
    }
  });

  $( "#datepicker-to" ).datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function(selected) {
      jQuery("#datepicker-from").datepicker("option","maxDate",selected)
    }
  });

  $( "#datepicker-from, #datepicker-to" ).on( "click", function() {
    $("#or_range").prop("checked", true);
  });

  $('#submit_filter').on('submit', function(e) {
    e.preventDefault();

    var values = {};
    var dates = validate_date();

    if (dates) {
      $.each($('#submit_filter').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });

      var dateFrom = dates['dateFrom'];
      var dateTo = dates['dateTo'];
    
      var url = '/m/results/mainbook?sportCode='+values['sports-list']+'&dateFrom='+dateFrom+'&dateTo='+dateTo;

      processSportsResults(url, values['sports-list']);

    }
  });

  // load languages
  i18n.init({ lng : isoCode, resGetPath : i18nPath, keyseparator: null}, function(t) {
    loadSports();
    updateTranslation();

    showForm();
    $.datepicker.setDefaults( $.datepicker.regional[ isoCode.substring(0,2) ] );

    hideLoading();
  });

}); //document.ready
