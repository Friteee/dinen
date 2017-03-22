var scriptsWithInit = {'dashboard' : null, 'landing' : null, 'menu' : null,
                       'order' : null, 'cook' : null, 'search' : null,
                       'payment' : null};
var loadedScripts = [];
var usingHeaderTemplate = false;

$(window).on('load', function () {
  // The following code is provided by the Imperial theme.

  // Initiate the wowjs
  new WOW().init();

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0}, 750, 'easeInOutExpo');
    return false;
  });

  // End of Imperial code.

  // TODO: look at the URL and load the appropriate page (GET?)
  if (isManager()) {
    loadPage('dashboard');
  } else {
    loadPage('landing');
  }
});

function loadPage(name) {
  showPreloader(function () {
    // After the pre-loader image is shown, load the page's html into the
    // page_contents div (on index).
    prepareTemplate(name, function (container) {
      container.load('html/' + name + '.html', function () {
        // Load the page's JS it (if not already loaded) and initialise it,
        // then hide the pre-loader, otherwise hide the pre-loader 'straight
        // away'.

        // Ensure that the script isn't loaded twice.
        if ($.inArray(name, loadedScripts) == -1) {
          // Script not loaded.
          $.getScript('js/' + name + '.js', function () {
            loadedScripts.push(name);
            initPageScript(name);
            hidePreloader();
          });
        } else {
          initPageScript(name);
          hidePreloader();
        }
      });
    });
  });
}

function prepareTemplate(name, callback) {
  if (name == 'landing') {
    callback($('#base_template_contents'));
    usingHeaderTemplate = false;
  } else {
    if (usingHeaderTemplate) {
      callback($('#header_template_contents'));
    } else {
      $('#base_template_contents').load('html/header.html', function () {
        initHeader();
        callback($('#header_template_contents'));
        usingHeaderTemplate = true;
      });
    }
  }
}

function initPageScript(name) {
  // Determine whether the script needs to be initialised or not, by checking if
  // its name is a key in scriptsWithInit.
  if ($.inArray(name, Object.keys(scriptsWithInit)) != -1) {
    // Create a new instance of the object defined by the script (which
    // contains init), if there isn't one already.
    if (scriptsWithInit[name] == null) {
      // With help from http://stackoverflow.com/a/9804142
      scriptsWithInit[name] = new window[capitaliseFirstLetter(name)]();
    }
    scriptsWithInit[name].init();
  }
}

function showPreloader(callback) {
  // Hide the scroll bar.
  $('html, body').css({
    'overflow': 'hidden',
    'height': '100%'
  });
  // Check whether the pre-loader image is already shown (when the user first
  // visits the site), or not.
  var preloader = $('#preloader');
  if (preloader.css('display') == 'none') {
    // If it isn't, trigger the slide-down animation.
    preloader.slideDown(300, function () {
      // Once the animation is complete, call the function that defines what
      // to do next.
      callback();
    });
  } else {
    // The pre-loader image is already shown, so call the function that
    // defines what to do next.
    callback();
  }
}

function hidePreloader() {
  // Trigger the slide-up animation after a delay of 200ms.
  $('#preloader').delay(200).slideUp(400, function () {
    // Once complete, hide the pre-loader and allow the scroll bar to be shown.
    $(this).hide();
    $('html, body').css({
      'overflow': 'auto',
      'height': 'auto'
    });
  });
}

function register(event) {
  var ref = $(this).find("[required]");
  $(ref).each(function () {
    if ($(this).val() === '') {
      alert("Required field should not be blank.");
      $(this).focus();
      event.preventDefault();
      return false;
    }
  });
  $.ajax({
    url: apiURL,
    type: 'POST',
    data: 'request=register&data=' + formToJSON('#register-form')
  }).done(function (response) {
    if (response == 'success') {
      alert('Registration email was sent to your email');
      window.location.replace('index.html');
    } else {
      alert(response);
    }
  });
  return false;
}
