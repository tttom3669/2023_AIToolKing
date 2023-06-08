$(function () {
  $('.navbar-btn').on('click', () => {
    $(`[data-id="navbar-collapse"]`).fadeToggle();
  });

  // 開起選單
$(`[data-id="dropdown-btn"]`).click(function(e) {
    $(`[data-id="dropdown-menu"]`).toggleClass('d-block');
  });
  $(`[data-id="filter-btn"]`).click(function(e) {
    $(`[data-id="filter-dropdown-menu"]`).toggleClass('d-block');
  });

  
  // 切換按鈕文字
  $('.new-to-old').click(function(e) {
    e.preventDefault();
    $('.dropdown-menu').toggleClass('d-block');
    $('.dropdown-btnText').text($(this).text());
  });
  
  $('.old-to-new').click(function(e) {
    e.preventDefault();
    $('.dropdown-menu').toggleClass('d-block');
    $('.dropdown-btnText').text($(this).text());
  });



  $('.qa-item').click(function(e) {
    $(this).toggleClass('active');
    $(this).find('.add-icon').toggleClass('d-none');
    $(this).find('.remove-icon').toggleClass('d-block');
    $(this).find('.collapse-content p').toggleClass('d-block');
  });
});



  