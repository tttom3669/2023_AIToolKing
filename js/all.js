const btnIcon_close = 'https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/icons/close.png?raw=true';
const btnIcon_menu = 'https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/icons/menu.png?raw=true';
let curBtnICon = "";
$(function () {
  $('.navbar-btn').on('click', () => {
    $(`[data-id="navbar-collapse"]`).toggleClass('navbar-collapse');
    if($(".navbar-btn img").attr('src') === btnIcon_menu){
      curBtnICon = btnIcon_close;
    }else{
      curBtnICon = btnIcon_menu;
    }
    $(".navbar-btn img").attr('src',`${curBtnICon}`);
    $('body').toggleClass('overflow-y-hidden');
  });

  // 開起選單
$(`[data-id="dropdown-btn"]`).click(function(e) {
    $(`[data-id="dropdown-menu"]`).toggleClass('d-block');
  });
  $(`[data-id="filter-btn"]`).click(function(e) {
    $(`[data-id="filter-dropdown-menu"]`).toggleClass('d-block');
  });


  $('.qa-item').click(function(e) {
    $(this).toggleClass('active');
    $(this).find('.add-icon').toggleClass('d-none');
    $(this).find('.remove-icon').toggleClass('d-block');
    $(this).find('.collapse-content p').slideToggle('d-block');
  });
});



  