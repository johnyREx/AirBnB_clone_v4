// Input checkbox tuning
const adict = {};
$(function () {
  const alist = [];
  $('[type=checkbox]').change(function (event) {
    const IDofamen = $(this).attr('data-id');
    const Nameofamen = $(this).attr('data-name');

    if ($(event.target).is(':checked')) {
      adict[IDofamen] = Nameofamen;
      alist.push(Nameofamen);
    } else {
      delete adict[IDofamen];
      alist.splice(alist.indexOf(Nameofamen), 1);
    }
    $('.amenities h4').html(alist.join(', '));
  });

  // api_status = "OK" check
  $.get('http://0.0.0.0:5001/api/v1/status/', function (info) {
    if (info.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // task 4: 3.js
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (info) {
      for (let i = 0; i < info.length; i++) {
        const place = info[i];
        $('.places').append(
          '<article><div class="title_box"><h2>' + place.name +
              '</h2><div class="price_by_night">$' + place.price_by_night +
              '</div></div><div class="information"><div class="max_guest">' +
              rmAddS(place.max_guest, 'Guest') +
              '</div><div class="number_rooms">' +
              rmAddS(place.number_rooms, 'Bedroom') +
              '</div><div class="number_bathrooms">' +
              rmAddS(place.number_bathrooms, 'Bathroom') +
              '</div></div><div class="description">' +
              place.description + '</div></article>');
      }
    }
  });

  function rmAddS (num, name) {
    if (num === 1) { return `${num} ${name}`; } else { return `${num} ${name}s`; }
  }

  // task 5: 4.js
  $('[type=button]').click(function () {
    $('.places').empty();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: adict }),
      success: function (info) {
        for (let i = 0; i < info.length; i++) {
          const place = info[i];
          $('.places').append(
            '<article><div class="title_box"><h2>' + place.name +
                '</h2><div class="price_by_night">$' + place.price_by_night +
                '</div></div><div class="information"><div class="max_guest">' +
                rmAddS(place.max_guest, 'Guest') +
                '</div><div class="number_rooms">' +
                rmAddS(place.number_rooms, 'Bedroom') +
                '</div><div class="number_bathrooms">' +
                rmAddS(place.number_bathrooms, 'Bathroom') +
                '</div></div><div class="description">' +
                place.description + '</div></article>');
        }
      }
    });
  });
});
