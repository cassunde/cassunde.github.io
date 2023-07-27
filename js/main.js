;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};

	var loadArticles = function(){
		const minhaUrl = "https://dev.to/api/articles?username=cassunde"
		fetch(minhaUrl).then(function(response) {
		return response.json();
		}).then(function(data) {
			var cards = "";
			data
			.sort(compareArticles)
			.forEach((element, index) => {
				if(index <= 2)
					cards = cards + `
						<div class="col-md-4">
							<div class="fh5co-blog">
								<a href="#" class="blog-bg" style="background-image: url(${element.cover_image?element.cover_image:""});"></a>
								<div class="blog-text">
									<span class="posted_on">${element.readable_publish_date}</span>
									<h3><a href="${element.url}">${element.title}</a></h3>
									<p>${element.description}</p>
									<ul class="stuff">
										<li><i class="icon-heart2"></i>${element.public_reactions_count}</li>
										<li><a href="${element.url}">Read More<i class="icon-arrow-right22"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
						`

						
			});
			document.getElementById("row-posts").innerHTML = cards
			
		}).catch(function() {
			console.log("Houve algum problema!");
		});
	}

	var loadRepos = function(){
		const minhaUrl = "https://api.github.com/users/cassunde/repos?page=1&per_page=50"
		fetch(minhaUrl).then(function(response) {
		return response.json();
		}).then(function(data) {
			var cards = "";
			data
			.sort(compareRepos)
			.forEach((element, index) => {
				if(index <= 2)
					cards = cards + `
						<div class="col-md-4">
							<div class="fh5co-blog">								
								<div class="blog-text">
									<h3><a href="${element.html_url}">${element.name}</a></h3>
									<p>${element.description}</p>
									<ul class="stuff">
										<li><i class="icon-heart2"></i>${element.stargazers_count}</li>
										<li><a href="${element.html_url}">Read More<i class="icon-arrow-right22"></i></a></li>
									</ul>
								</div> 
							</div>
						</div>
						`

						
			});
			console.log(cards);
			document.getElementById("row-repos").innerHTML = cards
			
		}).catch(function() {
		console.log("Houve algum problema!");
		});
	}

	function compareArticles(a, b) {
		return b.public_reactions_count - a.public_reactions_count;
	}
	function compareRepos(a, b) {
		return b.stargazers_count - a.stargazers_count;
	}

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
		loadArticles();
		loadRepos();
	});


}());