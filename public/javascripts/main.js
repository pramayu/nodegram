// auth

$(document).ready(function(){
  //slider
  $('.this_list li:gt(0)').hide();
  setInterval(function(){
    $('.this_list > :first-child').fadeOut(4000).next('li').fadeIn(4000).end().appendTo('.this_list');
  }, 4000);

  //to signup 
  $('#login-btn').on('click', function(){
  	window.location.href="/users/login";
  });

  //to login
  $('#sign-btn').on('click', function(){
  	window.location.href="/users/signup";
  });
});
