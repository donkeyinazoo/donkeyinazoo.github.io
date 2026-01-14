// template html5up-paradigm-shift

/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body");
  $sidebar = $("#sidebar");
  //forty
  // ($wrapper = $("#wrapper")),
  //   ($header = $("#header")),
  //   ($banner = $("#banner"));

  // Breakpoints.
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Hack: Enable IE workarounds.
  if (browser.name == "ie") $body.addClass("is-ie");

  // Mobile?
  if (browser.mobile) $body.addClass("is-mobile");

  // Scrolly.
  $(".scrolly").scrolly({
    offset: 100,
  });

  // Polyfill: Object fit.
  if (!browser.canUse("object-fit")) {
    $(".image[data-position]").each(function () {
      var $this = $(this),
        $img = $this.children("img");

      // Apply img as background.
      $this
        .css("background-image", 'url("' + $img.attr("src") + '")')
        .css("background-position", $this.data("position"))
        .css("background-size", "cover")
        .css("background-repeat", "no-repeat");

      // Hide img.
      $img.css("opacity", "0");
    });

    $(".gallery > a").each(function () {
      var $this = $(this),
        $img = $this.children("img");

      // Apply img as background.
      $this
        .css("background-image", 'url("' + $img.attr("src") + '")')
        .css("background-position", "center")
        .css("background-size", "cover")
        .css("background-repeat", "no-repeat");

      // Hide img.
      $img.css("opacity", "0");
    });
  }

  // Gallery.
  $(".gallery")
    .on("click", "a", function (event) {
      var $a = $(this),
        $gallery = $a.parents(".gallery"),
        $modal = $gallery.children(".modal"),
        $modalImg = $modal.find("img"),
        href = $a.attr("href");

      // Not an image? Bail.
      if (!href.match(/\.(jpg|gif|png|mp4)$/)) return;

      // Prevent default.
      event.preventDefault();
      event.stopPropagation();

      // Locked? Bail.
      if ($modal[0]._locked) return;

      // Lock.
      $modal[0]._locked = true;

      // Set src.
      $modalImg.attr("src", href);

      // Set visible.
      $modal.addClass("visible");

      // Focus.
      $modal.focus();

      // Delay.
      setTimeout(function () {
        // Unlock.
        $modal[0]._locked = false;
      }, 600);
    })
    .on("click", ".modal", function (event) {
      var $modal = $(this),
        $modalImg = $modal.find("img");

      // Locked? Bail.
      if ($modal[0]._locked) return;

      // Already hidden? Bail.
      if (!$modal.hasClass("visible")) return;

      // Stop propagation.
      event.stopPropagation();

      // Lock.
      $modal[0]._locked = true;

      // Clear visible, loaded.
      $modal.removeClass("loaded");

      // Delay.
      setTimeout(function () {
        $modal.removeClass("visible");

        setTimeout(function () {
          // Clear src.
          $modalImg.attr("src", "");

          // Unlock.
          $modal[0]._locked = false;

          // Focus.
          $body.focus();
        }, 475);
      }, 125);
    })
    .on("keypress", ".modal", function (event) {
      var $modal = $(this);

      // Escape? Hide modal.
      if (event.keyCode == 27) $modal.trigger("click");
    })
    .on("mouseup mousedown mousemove", ".modal", function (event) {
      // Stop propagation.
      event.stopPropagation();
    })
    .prepend(
      '<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>'
    )
    .find("img")
    .on("load", function (event) {
      var $modalImg = $(this),
        $modal = $modalImg.parents(".modal");

      setTimeout(function () {
        // No longer visible? Bail.
        if (!$modal.hasClass("visible")) return;

        // Set loaded.
        $modal.addClass("loaded");
      }, 275);
    });

  // template html5up-forty
  // Tiles.
  var $tiles = $(".tiles > article");

  $tiles.each(function () {
    var $this = $(this),
      $image = $this.find(".image"),
      $img = $image.find("img"),
      $link = $this.find(".link"),
      x;

    // Image.

    // Set image.
    $this.css("background-image", "url(" + $img.attr("src") + ")");

    // Set position.
    if ((x = $img.data("position"))) $image.css("background-position", x);

    // Hide original.
    $image.hide();

    // Link.
    if ($link.length > 0) {
      $x = $link.clone().text("").addClass("primary").appendTo($this);

      $link = $link.add($x);

      $link.on("click", function (event) {
        var href = $link.attr("href");

        // Prevent default.
        event.stopPropagation();
        event.preventDefault();

        // Target blank?
        if ($link.attr("target") == "_blank") {
          // Open in new tab.
          window.open(href);
        }

        // Otherwise ...
        else {
          // Start transitioning.
          $this.addClass("is-transitioning");
          $wrapper.addClass("is-transitioning");

          // Redirect.
          window.setTimeout(function () {
            location.href = href;
          }, 500);
        }
      });
    }
  });

  // Menu.
  var $menu = $("#menu"),
    $menuInner;

  $menu.wrapInner('<div class="inner"></div>');
  $menuInner = $menu.children(".inner");
  $menu._locked = false;

  $menu._lock = function () {
    if ($menu._locked) return false;

    $menu._locked = true;

    window.setTimeout(function () {
      $menu._locked = false;
    }, 350);

    return true;
  };

  $menu._show = function () {
    if ($menu._lock()) $body.addClass("is-menu-visible");
  };

  $menu._hide = function () {
    if ($menu._lock()) $body.removeClass("is-menu-visible");
  };

  $menu._toggle = function () {
    if ($menu._lock()) $body.toggleClass("is-menu-visible");
  };

  $menuInner
    .on("click", function (event) {
      event.stopPropagation();
    })
    .on("click", "a", function (event) {
      var href = $(this).attr("href");

      event.preventDefault();
      event.stopPropagation();

      // Hide.
      $menu._hide();

      // Redirect.
      window.setTimeout(function () {
        window.location.href = href;
      }, 250);
    });

  $menu
    .appendTo($body)
    .on("click", function (event) {
      event.stopPropagation();
      event.preventDefault();

      $body.removeClass("is-menu-visible");
    })
    .append('<a class="close" href="#menu">Close</a>');

  $body
    .on("click", 'a[href="#menu"]', function (event) {
      event.stopPropagation();
      event.preventDefault();

      // Toggle.
      $menu._toggle();
    })
    .on("click", function (event) {
      // Hide.
      $menu._hide();
    })
    .on("keydown", function (event) {
      // Hide on escape.
      if (event.keyCode == 27) $menu._hide();
    });

  // template html5up-forty

  // custom

  //contact-content
  var $contactmenu = $("#contactmenu"),
    $contactmenuInner;

  $contactmenu.wrapInner('<div class="inner"></div>');
  $contactmenuInner = $contactmenu.children(".inner");
  $contactmenu._locked = false;

  $contactmenu._lock = function () {
    if ($contactmenu._locked) return false;

    $contactmenu._locked = true;

    window.setTimeout(function () {
      $contactmenu._locked = false;
    }, 350);

    return true;
  };

  $contactmenu._show = function () {
    if ($contactmenu._lock()) $body.addClass("is-contactmenu-visible");
  };

  $contactmenu._hide = function () {
    if ($contactmenu._lock()) $body.removeClass("is-contactmenu-visible");
  };

  $contactmenu._toggle = function () {
    if ($contactmenu._lock()) $body.toggleClass("is-contactmenu-visible");
  };

  $contactmenuInner
    .on("click", function (event) {
      event.stopPropagation();
    })
    .on("click", "a", function (event) {
      var href = $(this).attr("href");

      event.preventDefault();
      event.stopPropagation();

      // Hide.
      $contactmenu._hide();

      // Redirect.
      window.setTimeout(function () {
        window.location.href = href;
      }, 250);
    });

  $contactmenu
    .appendTo($body)
    .on("click", function (event) {
      event.stopPropagation();
      event.preventDefault();

      $body.removeClass("is-contactmenu-visible");
    })
    .append('<a class="close" href="#contactmenu">Close</a>');

  $body
    .on("click", 'a[href="#contactmenu"]', function (event) {
      event.stopPropagation();
      event.preventDefault();

      // Toggle.
      $contactmenu._toggle();
    })
    .on("click", function (event) {
      // Hide.
      $contactmenu._hide();
    })
    .on("keydown", function (event) {
      // Hide on escape.
      if (event.keyCode == 27) $contactmenu._hide();
    });

  //Get the button
  let mybutton = document.getElementById("btn-back-to-top");
  // let sidebarmenu = document.getElementById("sidebar");
  // let contactheight = $("#contact-menu").css("height");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }

    // if (
    //   document.body.scrollTop > 600 ||
    //   document.documentElement.scrollTop > 600
    // ) {
    //   sidebarmenu.style.display = "block";
    //   document.getElementById("sidebar").style.transition = "ease 5s";
    // } else {
    //   sidebarmenu.style.display = "none";
    // }
  }

  // Function to check if an element is in the viewport
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  // Function to handle the hide/show effect for the sidebar
  function handleSidebarVisibility() {
    const introSection = document.querySelector(".intro");
    const contactMenuSection = document.getElementById("contact-menu");
    const sidebar = document.getElementById("sidebar");

    if (
      isElementInViewport(introSection) ||
      isElementInViewport(contactMenuSection)
    ) {
      sidebar.classList.add("hidden");
    } else {
      sidebar.classList.remove("hidden");
    }
  }

  // Add a scroll event listener to the window
  window.addEventListener("scroll", handleSidebarVisibility);

  // Call the handleSidebarVisibility function initially
  window.addEventListener("load", handleSidebarVisibility);

  // When the user clicks on the button, scroll to the top of the document
  mybutton.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // Education collapsible

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  // Darkness Song Button

  $(window).scroll(function () {
    var vH = $(window).height(),
      bodyHeight = $(document).height() - vH * 1.1,
      // When you open a page, you already see the website as big
      // as your own screen (viewport). Therefor you need to reduce
      // the page by two times the viewport
      scrolledPX = $(window).scrollTop();
    if (scrolledPX > bodyHeight) {
      $(".darkness").css("opacity", "1");
    } else {
      $(".darkness").css("opacity", "0");
    }
  });

  function play() {
    var audio = document.getElementById("audio");
    audio.play();
  }

  let playBtn = document.getElementsByClassName("play");

  let text = document.getElementById("intro-darkness");

  // Store the original HTML content
  const originalHTML = text.innerHTML;

  const audio = new Audio(
    "/assets/files/05-the-sound-of-silence-00_00_03-00_00_12.mp3"
  );

  playBtn[0].addEventListener("click", (e) => {
    audio.play();
    // Setting this CSS style to solve the problem with new lines in textContent
    text.setAttribute("style", "white-space: pre;");
    // Add \r\n in text everywhere you want for line-break (new line)
    text.textContent = "Audio Playing 🔊 // \r\n";
    text.textContent += "The Sound of Silence by Simon & Garfunkel!";
  });

  // Add an event listener to detect when the audio playback has ended
  audio.addEventListener("ended", () => {
    // Reset the HTML content to the original HTML
    text.innerHTML = originalHTML;
  });

  // Function to play the audio
  function playAudio() {
    var audio = document.getElementById("audio");
    audio.play();
  }

  // Add event listener to the icon for playing audio
  var playSoundButton = document.querySelector(".play-sound");
  playSoundButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    playAudio();
  });

  // Sidebar.
  if ($sidebar.length > 0) {
    var $sidebar_a = $sidebar.find("a");

    $sidebar_a
      .addClass("scrolly")
      .on("click", function () {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr("href").charAt(0) != "#") return;

        // Deactivate all links.
        $sidebar_a.removeClass("active");

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass("active").addClass("active-locked");
      })
      .each(function () {
        var $this = $(this),
          id = $this.attr("href"),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: "middle",
          top: "-20vh",
          bottom: "-20vh",
          initialize: function () {
            // Deactivate section.
            $section.addClass("inactive");
          },
          enter: function () {
            // Activate section.
            $section.removeClass("inactive");

            // No locked links? Deactivate all links and activate this section's one.
            if ($sidebar_a.filter(".active-locked").length == 0) {
              $sidebar_a.removeClass("active");
              $this.addClass("active");
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass("active-locked"))
              $this.removeClass("active-locked");
          },
        });
      });
  }

  // custom
})(jQuery);

// template html5up-paradigm-shift

// template html5up-forty

/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
/**
//  * Applies parallax scrolling to an element's background image.
//  * @return {jQuery} jQuery object.
//  */
// $.fn._parallax =
//   browser.name == "ie" || browser.name == "edge" || browser.mobile
//     ? function () {
//         return $(this);
//       }
//     : function (intensity) {
//         var $window = $(window),
//           $this = $(this);

//         if (this.length == 0 || intensity === 0) return $this;

//         if (this.length > 1) {
//           for (var i = 0; i < this.length; i++) $(this[i])._parallax(intensity);

//           return $this;
//         }

//         if (!intensity) intensity = 0.25;

//         $this.each(function () {
//           var $t = $(this),
//             on,
//             off;

//           on = function () {
//             $t.css(
//               "background-position",
//               "center 100%, center 100%, center 0px"
//             );

//             $window.on("scroll._parallax", function () {
//               var pos =
//                 parseInt($window.scrollTop()) - parseInt($t.position().top);

//               $t.css(
//                 "background-position",
//                 "center " + pos * (-1 * intensity) + "px"
//               );
//             });
//           };

//           off = function () {
//             $t.css("background-position", "");

//             $window.off("scroll._parallax");
//           };

//           breakpoints.on("<=medium", off);
//           breakpoints.on(">medium", on);
//         });

//         $window
//           .off("load._parallax resize._parallax")
//           .on("load._parallax resize._parallax", function () {
//             $window.trigger("scroll");
//           });

//         return $(this);
//       };

// // Play initial animations on page load.
// $window.on("load", function () {
//   window.setTimeout(function () {
//     $body.removeClass("is-preload");
//   }, 100);
// });

// // Clear transitioning state on unload/hide.
// $window.on("unload pagehide", function () {
//   window.setTimeout(function () {
//     $(".is-transitioning").removeClass("is-transitioning");
//   }, 250);
// });

// // Fix: Enable IE-only tweaks.
// if (browser.name == "ie" || browser.name == "edge") $body.addClass("is-ie");

// // Scrolly.
// $(".scrolly").scrolly({
//   offset: function () {
//     return $header.height() - 2;
//   },
// });

// Tiles.
// var $tiles = $(".tiles > article");

// $tiles.each(function () {
//   var $this = $(this),
//     $image = $this.find(".image"),
//     $img = $image.find("img"),
//     $link = $this.find(".link"),
//     x;

// 	// Image.

// 		// Set image.
// 			$this.css('background-image', 'url(' + $img.attr('src') + ')');

// 		// Set position.
// 			if (x = $img.data('position'))
// 				$image.css('background-position', x);

// 		// Hide original.
// 			$image.hide();

// 	// Link.
// 		if ($link.length > 0) {

// 			$x = $link.clone()
// 				.text('')
// 				.addClass('primary')
// 				.appendTo($this);

// 			$link = $link.add($x);

// 			$link.on('click', function(event) {

// 				var href = $link.attr('href');

// 				// Prevent default.
// 					event.stopPropagation();
// 					event.preventDefault();

// 				// Target blank?
// 					if ($link.attr('target') == '_blank') {

// 						// Open in new tab.
// 							window.open(href);

// 					}

// 				// Otherwise ...
// 					else {

// 						// Start transitioning.
// 							$this.addClass('is-transitioning');
// 							$wrapper.addClass('is-transitioning');

// 						// Redirect.
// 							window.setTimeout(function() {
// 								location.href = href;
// 							}, 500);

// 					}

// 			});

// 		}

// });

// Header.
// if ($banner.length > 0
// &&	$header.hasClass('alt')) {

// 	$window.on('resize', function() {
// 		$window.trigger('scroll');
// 	});

// 	$window.on('load', function() {

// 		$banner.scrollex({
// 			bottom:		$header.height() + 10,
// 			terminate:	function() { $header.removeClass('alt'); },
// 			enter:		function() { $header.addClass('alt'); },
// 			leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
// 		});

// 		window.setTimeout(function() {
// 			$window.triggerHandler('scroll');
// 		}, 100);

// 	});

// }

// Banner.
// $banner.each(function() {

// 	var $this = $(this),
// 		$image = $this.find('.image'), $img = $image.find('img');

// 	// Parallax.
// 		$this._parallax(0.275);

// 	// Image.
// 		if ($image.length > 0) {

// 			// Set image.
// 				$this.css('background-image', 'url(' + $img.attr('src') + ')');

// 			// Hide original.
// 				$image.hide();

// 		}

// });

// Menu.
// var $menu = $("#menu"),
//   $menuInner;

// $menu.wrapInner('<div class="inner"></div>');
// $menuInner = $menu.children(".inner");
// $menu._locked = false;

// $menu._lock = function () {
//   if ($menu._locked) return false;

//   $menu._locked = true;

//   window.setTimeout(function () {
//     $menu._locked = false;
//   }, 350);

//   return true;
// };

// $menu._show = function () {
//   if ($menu._lock()) $body.addClass("is-menu-visible");
// };

// $menu._hide = function () {
//   if ($menu._lock()) $body.removeClass("is-menu-visible");
// };

// $menu._toggle = function () {
//   if ($menu._lock()) $body.toggleClass("is-menu-visible");
// };

// $menuInner
//   .on("click", function (event) {
//     event.stopPropagation();
//   })
//   .on("click", "a", function (event) {
//     var href = $(this).attr("href");

//     event.preventDefault();
//     event.stopPropagation();

//     // Hide.
//     $menu._hide();

//     // Redirect.
//     window.setTimeout(function () {
//       window.location.href = href;
//     }, 250);
//   });

// $menu
//   .appendTo($body)
//   .on("click", function (event) {
//     event.stopPropagation();
//     event.preventDefault();

//     $body.removeClass("is-menu-visible");
//   })
//   .append('<a class="close" href="#menu">Close</a>');

// $body
//   .on("click", 'a[href="#menu"]', function (event) {
//     event.stopPropagation();
//     event.preventDefault();

//     // Toggle.
//     $menu._toggle();
//   })
//   .on("click", function (event) {
//     // Hide.
//     $menu._hide();
//   })
//   .on("keydown", function (event) {
//     // Hide on escape.
//     if (event.keyCode == 27) $menu._hide();
//   });
// })(jQuery);

// template html5up-forty
