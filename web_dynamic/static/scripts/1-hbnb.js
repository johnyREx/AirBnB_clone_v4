// Input checkbox tuning
$(function () {
  const adict = {};
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
});
