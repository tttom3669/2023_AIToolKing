$(function () {
  $('.navbar-btn').on('click', () => {
    $(`[data-id="navbar-collapse"]`).fadeToggle();
  });

  $('.qa-item').click(function(e) {
    $(this).toggleClass('active');
    $(this).find('.add-icon').toggleClass('d-none');
    $(this).find('.remove-icon').toggleClass('d-block');
    $(this).find('.collapse-content p').toggleClass('d-block');
  });
});



  