(function($) {
	"use strict";

	
	/* ============================================================ */
	/* PRELOADER
	/* ============================================================ */
    $(window).on('load', function() {
        $(".preloader").fadeOut();     
	});
	
	/* ============================================================ */
	/* WINDOW ONLOAD SUBSCRIBE POPUP SHOW
	/* ============================================================ */
	$(window).on('load', function() {
		setTimeout(function() {
			$("#onload-popup").modal('show', {});
		}, 3000);
	});

	/* ============================================================ */
	/* TOOLTIP ACTIVATION
	/* ============================================================ */
	$(function() {
		$('[data-toggle="tooltip"]').tooltip();
	})

	/* ============================================================ */
	/* MOBILE MENU ACTIVATE
	/* ============================================================ */
	function mobileNav($selector, $parentSelector) {
		var $mobileNav = $($selector);
		$mobileNav.on("click", function() {
			$($selector).toggleClass('expand-menu');
		});
		$('.menu-icon a').on("click", function() {
			event.preventDefault();
			$('.navbar-mobile').toggleClass('expand-menu');
		});

		var $closeButton = $($parentSelector).find(".expand-menu");
		$closeButton.each(function() {
			var $self = $(this);
			$self.on("click", function() {
				$self.parent($parentSelector).toggleClass('expand-menu');
			});
		});

		$(document).on('click', function(e) {
			var $selectorType = $($parentSelector).add($mobileNav);
			if ($selectorType.is(e.target) !== true && $selectorType.has(e.target).length === 0) {
				$($parentSelector).removeClass("expand-menu");
			}
		});
	};
	mobileNav('.menu-icon a', '.navbar-mobile');
	$('.close-menu a').on('click', function() {
		$('.navbar-mobile').removeClass('expand-menu');
	});

	/* ============================================================ */
	/* HEADER MAIN SEARCH FORM CATEGORY SELECT
	/* ============================================================ */
	var search_category_select = $('.header-main .search-form').length;
	if (search_category_select) {
		var x, i, j, l, ll, selElmnt, a, b, c;
		/*look for any elements with the class "custom-select":*/
		x = document.getElementsByClassName("search-category");
		l = x.length;
		for (i = 0; i < l; i++) {
			selElmnt = x[i].getElementsByTagName("select")[0];
			ll = selElmnt.length;
			/*for each element, create a new DIV that will act as the selected item:*/
			a = document.createElement("div");
			a.setAttribute("class", "select-selected");
			a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
			x[i].appendChild(a);
			/*for each element, create a new DIV that will contain the option list:*/
			b = document.createElement("ul");
			b.setAttribute("class", "select-items select-hide list-unstyled");
			for (j = 1; j < ll; j++) {
				/*for each option in the original select element,
				create a new DIV that will act as an option item:*/
				c = document.createElement("li");
				c.innerHTML = selElmnt.options[j].innerHTML;
				c.addEventListener("click", function(e) {
					/*when an item is clicked, update the original select box,
					and the selected item:*/
					var y, i, k, s, h, sl, yl;
					s = this.parentNode.parentNode.getElementsByTagName("select")[0];
					sl = s.length;
					h = this.parentNode.previousSibling;
					for (i = 0; i < sl; i++) {
						if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
							yl = y.length;
							for (k = 0; k < yl; k++) {
								y[k].removeAttribute("class");
							}
							this.setAttribute("class", "same-as-selected");
							break;
						}
					}
					h.click();
				});
				b.appendChild(c);
			}
			x[i].appendChild(b);
			a.addEventListener("click", function(e) {
				/*when the select box is clicked, close any other select boxes,
				and open/close the current select box:*/
				e.stopPropagation();
				closeAllSelect(this);
				this.nextSibling.classList.toggle("select-hide");
				this.classList.toggle("select-arrow-active");
			});
		}

		function closeAllSelect(elmnt) {
			/*a function that will close all select boxes in the document,
			except the current select box:*/
			var x, y, i, xl, yl, arrNo = [];
			x = document.getElementsByClassName("select-items");
			y = document.getElementsByClassName("select-selected");
			xl = x.length;
			yl = y.length;
			for (i = 0; i < yl; i++) {
				if (elmnt == y[i]) {
					arrNo.push(i)
				} else {
					y[i].classList.remove("select-arrow-active");
				}
			}
			for (i = 0; i < xl; i++) {
				if (arrNo.indexOf(i)) {
					x[i].classList.add("select-hide");
				}
			}
		}
		/*if the user clicks anywhere outside the select box,
		then close all select boxes:*/
		document.addEventListener("click", closeAllSelect);
	}

	/* ============================================================ */
	/* HOMEPAGE BANNER SLIDER
	/* ============================================================ */
	$(document).ready(function() {

		var bannerSlider = $('.home-banner-carousel');
		bannerSlider.on('changed.owl.carousel', function(event) {
			// Selecting the Current Active Item
			var item = event.item.index;
			// First Removing animation for the all caption
			$('h6').removeClass('animate__animated animate__fadeInDown');
			$('.owl-item').not('.clone').eq(item).find('h6').addClass('animate__animated animate__fadeInDown');
			$('h1').removeClass('animate__animated animate__fadeInDown animate__delay-05s');
			$('.owl-item').not('.clone').eq(item).find('h1').addClass('animate__animated animate__fadeInDown animate__delay-05s');
			$('p').removeClass('animate__animated animate__fadeInDown animate__delay-1s');
			$('.owl-item').not('.clone').eq(item).find('p').addClass('animate__animated animate__fadeInDown animate__delay-1s');
			$('a').removeClass('animate__animated animate__fadeInUp animate__delay-15s');
			$('.owl-item').not('.clone').eq(item).find('a').addClass('animate__animated animate__fadeInUp animate__delay-15s');
		});

		bannerSlider.owlCarousel({
			items: 1,
			loop: 1,
			dots: !1,
			nav: 1,
			autoplay: 1,
			autoplaySpeed: 800,
			animateOut: 'fadeOut',
			autoplayTimeout: 10000,
		});
	});

	/* ============================================================ */
	/* BLOG DETAILS IMAEG SLIDER
	/* ============================================================ */
	var $blogdtls_gallery = $('.gallery-slider');
	$blogdtls_gallery.owlCarousel({
		items: 1,
		autoplay: 1,
		loop: 1,
		dots: !1,
		nav: 1,
	});

	/* ============================================================ */
	/* EXCLUSIVE OFFER COLLECTION SLIDER
	/* ============================================================ */
	var $mensCollection = $('.exclusive-offer .mens-collection');
	var $womensCollection = $('.exclusive-offer .womens-collection');
	$mensCollection.owlCarousel({
		items: 1,
		autoplay: 1,
		loop: 1,
		dots: 1,
		nav: !1,
		autoplaySpeed: 500,
		autoplayTimeout: 4000,
	});
	$womensCollection.owlCarousel({
		items: 1,
		autoplay: 1,
		loop: 1,
		dots: 1,
		nav: !1,
		autoplaySpeed: 500,
	});

	/* ============================================================ */
	/* OUR BRAND SLIDER
	/* ============================================================ */
	var $ourBrands = $('.our-brand-carousel');
	$ourBrands.owlCarousel({
		items: 2,
		autoplay: 1,
		loop: 1,
		dots: !1,
		nav: !1,
		margin: 30,
		autoplaySpeed: 1000,
		responsive: {
			992: {
				items: 5
			},
			767: {
				items: 4
			},
			480: {
				items: 3
			}
		}
	});

	/* ============================================================ */
	/* BLOG CAROUSEL
	/* ============================================================ */
	var $blogCarousel = $('.blog-carousel');
	$blogCarousel.owlCarousel({
		items: 1,
		autoplay: 1,
		loop: 1,
		dots: !1,
		nav: !1,
		margin: 30,
		autoplaySpeed: 1000,
		autoplayTimeout: 4000,
		responsive: {
			992: {
				items: 3,
				mouseDrag: !1,
			},
			768: {
				items: 2
			}
		}
	})

	/* ============================================================ */
	/* TESTIMONIAL CAROUSEL
	/* ============================================================ */
	var $testimonial = $('.testimonial-carousel');
	$testimonial.owlCarousel({
		items: 1,
		autoplay: !1,
		loop: 1,
		dots: !1,
		nav: !1,
		margin: 30,
		autoplaySpeed: 1000,
	})

	/* ============================================================ */
	/* EXCLUSVE OFFER COUNTDOWN TIMER
	/* ============================================================ */
	var offerCountdown = $(".countdown-timer").length;
	if (offerCountdown) {
		function getTimeRemaining(endtime) {
			const total = Date.parse(endtime) - Date.parse(new Date());
			const seconds = Math.floor((total / 1000) % 60);
			const minutes = Math.floor((total / 1000 / 60) % 60);
			const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
			const days = Math.floor(total / (1000 * 60 * 60 * 24));

			return {
				total, days, hours, minutes, seconds
			};
		}

		function init_deal(id, endtime) {
			const clock = document.getElementById(id);
			const daysSpan = clock.querySelector('.day');
			const hoursSpan = clock.querySelector('.hour');
			const minutesSpan = clock.querySelector('.minute');
			const secondsSpan = clock.querySelector('.second');

			function updateClock() {
				const t = getTimeRemaining(endtime);
				daysSpan.innerHTML = t.days;
				hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
				minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
				secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}
			updateClock();
			const timeinterval = setInterval(updateClock, 1000);
		}
		const deadline1 = new Date('Aug 24, 2021 00:00:00');
		const deadline2 = new Date('Aug 24, 2021 00:00:00');
		init_deal('clockdiv1', deadline1);
		init_deal('clockdiv2', deadline2);
	};

	/* ============================================================ */
	/* PRODUCT DETAILS IMAGE SHOWCASE
	/* ============================================================ */
	var $prodSingTthumbnail = $('.prod-sing-thumbnail');
	$prodSingTthumbnail.owlCarousel({
		items: 4,
		autoplay: !1,
		loop: !1,
		nav: 1,
		margin: 20,
		mouseDrag: !1,
		dots: !1,
	})
	$('.prod-sing-thumbnail a').on('click', function(e) {
		e.preventDefault();
		var $href = $(this).attr('href');
		$('.prod-sing-thumbnail a').removeClass('active');
		$(this).addClass('active');
		$('.product-details-large .tab-pane').removeClass('active show');
		$('.product-details-large ' + $href).addClass('active show');
	})

	/* ============================================================ */
	/* NEW PRODUCTS ISOTOP SORTING
	/* ============================================================ */
	$(document).ready(function() {
		$('.new-products .new-products-wrapper .filter-buttons').on('click', 'li', function() {
			$(this).addClass('active').siblings().removeClass('active');

			var selector = $(this).attr('data-filter');
			var $grid = $('.new-products .product-item-wrapper').imagesLoaded(function() {

				// init Isotope after all images have loaded
				$grid.isotope({
					itemSelector: '.product-item',
					filter: selector
				});
			});
		});
	});

	/* ============================================================ */
	/* PRODUCT COLOR VARIANT
	/* ============================================================ */
	$('.product-variant ul').on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	/* ============================================================ */
	/* PRODUCT DETAILS REVIEW FORM SHOW
	/* ============================================================ */
	$('.leave-review').on('click', function(event) {
		$('.review-respond').css('display', 'block');
	});

	/* ============================================================ */
	/* PRODUCT DETAILS CUSTOMER REVIEW RATING STAR
	/* ============================================================ */
	$(document).ready(function() {
		// Visualizing things on Hover
		$('.rating-stars li').on('mouseover', function() {
			var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
			// Now highlight all the stars that's not after the current hovered star
			$(this).parent().children('li.star').each(function(e) {
				if (e < onStar) {
					$(this).addClass('hover');
				} else {
					$(this).removeClass('hover');
				}
			});
		}).on('mouseout', function() {
			$(this).parent().children('li.star').each(function(e) {
				$(this).removeClass('hover');
			});
		});
		// Action to perform on click 
		$('.rating-stars li').on('click', function() {
			var onStar = parseInt($(this).data('value'), 10); // The star currently selected
			var stars = $(this).parent().children('li.star');

			for (i = 0; i < stars.length; i++) {
				$(stars[i]).removeClass('selected');
			}

			for (i = 0; i < onStar; i++) {
				$(stars[i]).addClass('selected');
			}
		});
	});

	/* ============================================================ */
	/* PRODUCT LIST PAGE PRICE RANGE SLIDER
	/* ============================================================ */
	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 1000,
		values: [0, 500],
		slide: function(event, ui) {
			$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

	/* ============================================================ */
	/* PRODUCT IMAGE ZOOM ON DETAILS AND MODALS
	/* ============================================================ */
	$('.product-details-large .product-item').zoom({
		magnify: 1.2,
	});

	/* ============================================================ */
	/* USER DASHBOARD > UPLOADED PHOTO NAME SHOW ON LABEL
	/* ============================================================ */
	$('.userphoto').each(function() {
		var $input = $('.userphoto'),
			$label = $input.next('label'),
			labelVal = $label.html();

		$input.on('change', function(e) {
			var fileName = e.target.files[0].name;;

			if (fileName)
				$label.find('span').html(fileName);
			else
				$label.html(labelVal);
		});
		// Firefox bug fix
		$input
			.on('focus', function() {
				$input.addClass('has-focus');
			})
			.on('blur', function() {
				$input.removeClass('has-focus');
			});
	});

})(jQuery);