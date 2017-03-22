function initHeader() {
  // The following code is provided by the Imperial theme.

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });
  if(localStorage.getItem('JWT') === null)
  {
    var elements = "<li><a href='#eaters' onclick=\"return loadPage('search')\">For Food Eaters</a></li>";
    elements += "<li><a href='#restaurants' onclick=\"return loadPage('dashboard')\">For Restaurant</a></li>";
    elements += "<li><a href='#register' onclick='return loadPage(\"landing\")'>Sign Up</a></li>";
    elements += "<li><a href='#' onclick='return loadPage(\"login\")'>Log In</a></li>";
    $('#changed-navbar').html(elements);
  }
  else
  {
    var elements = "<li><a href='#eaters' onclick=\"return loadPage('search')\">For Food Eaters</a></li>";
    elements += "<li><a href='#restaurants' onclick=\"return loadPage('dashboard')\">For Restaurant</a></li>";
    elements += "<li><a href='#register' id='logout'>Logout</a></li>";
    $('#changed-navbar').html(elements);
    $('#logout').click(function () {
      var data = {};
      data['request'] = 'logout';
      data['jwt'] = getJWT();
      $.ajax({
        url: apiURL,
        type: 'POST',
        data: data
      }).done(function (response) {
        if (response.status === Status.SUCCESS) {
          loadPage('landing');
          localStorage.removeItem('JWT');
        } else {
          alert(response.data);
        }
      });
      return false;
    });
  }

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
    $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
    $('body').append( $mobile_nav );
    $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
    $('body').append( '<div id="mobile-body-overly"></div>' );
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e){
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e){
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  /* Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});
*/
  // End of Imperial code.
}

function logout()
{

}
