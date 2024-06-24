var current_form;

var browser = {
    isIe: function () {
        return navigator.appVersion.indexOf("MSIE") != -1;
    },
    navigator: navigator.appVersion,
    getVersion: function() {
        var version = 999; // we assume a sane browser
        if (navigator.appVersion.indexOf("MSIE") != -1)
            // bah, IE again, lets downgrade version number
            version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        return version;
    }
};

function ajaxRequest(form, data){
    $.ajax({
        url:  ajax_url,
        type: "POST",
        data: data + "&site_id=" + site_id, 
        success: function(response){
			//console.log(response);
			form.prepend(getSuccessHTML());
			resetForm(form);
		}, error: function(){

		}
	});
}

function isPhone(value){
	return value.match(/\d/g).length === 11;
}

function isEmail(value){
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(value);
}

function getErrorHTML(errors){
	var error_text = "";
	for(var i = 0; i < errors.length; i++){
		error_text += "<p>" + errors[i] + "</p>";
	}
	return '<div class="alert alert-danger" role="alert">' + error_text + '</div>';
}

function getSuccessHTML(){
	//var success_text = "Ваша заявка успешно отправлена";
	return '<div class="alert alert-success" role="alert">' + success_text + '</div>';
}

function resetForm(form){
	form.find("input[type=text], input[type=password], input[type=file], textarea").each(function(){
		$(this).val("");
		if($(this).hasClass("error-field")){
			$(this).removeClass("error-field");
		}
		if($(this).hasClass("placeholdersjs")){
			$(this).removeClass("placeholdersjs");
		}
		$(this).focus().blur();
	});

	form.find(".attach-file").text("");
}

function attachFile(filename){
	alert(filename);
}

$(document).ready(function(){

	if (browser.isIe() && browser.getVersion() == 9) {
		$(".price-tabs.nav-justified>li>a span").css({
			"font-size" : "0.85em"
		});
	} else {
		$("[data-type=phone]").inputmask("+7 999 999 99 99");
	}

	$(".bxslider").bxSlider({
		controls: false,
		auto: true
	});

	$('.bxcarousel').bxSlider({
		minSlides: 1,
		maxSlides: 5,
		slideWidth: 190,
		slideMargin: 10,
		pager: false,
		infiniteLoop: false
	});

	var owl = $(".owl-carousel");
	owl.owlCarousel({
		navigation : true,
		pagination: false,
		navigationText : ["prev","next"],
		items : 5,
		itemsDesktop : [1000,5],
		itemsDesktopSmall : [900,3],
		itemsTablet: [600,2],
		itemsMobile : [600,1]
	});

	var owl_reviews = $(".carousel-reviews");
	owl_reviews.owlCarousel({
		navigation : false,
		paginationNumbers: true,
		items : 2,
		itemsDesktop : [1000,2],
		itemsDesktopSmall : [900,2],
		itemsTablet: [600,2],
		itemsMobile : [600,1],
		autoPlay: true
	});

	var owl_prices = $(".carousel-prices");
	owl_prices.owlCarousel({
		navigation : true,
		pagination: false,
		navigationText : ["prev","next"],
		items : 1,
		itemsDesktop : [1000,1],
		itemsDesktopSmall : [900,1],
		itemsTablet: [600,1],
		itemsMobile : [600,1]
	});

	var owl_news = $(".carousel-news");
	owl_news.owlCarousel({
		navigation : true,
		pagination: false,
		navigationText : ["prev","next"],
		items : 3,
		itemsDesktop : [1000,3],
		itemsDesktopSmall : [900,2],
		itemsTablet: [600,2],
		itemsMobile : [600,1]
	});

	function updateSelect(styled_select){
		var selected = styled_select.find("select option:selected");
		if(selected.length == 0){
			selected = styled_select.find("select option").eq(0);
		}

		styled_select.find(".selected-item").text(selected.text());
	}

	$(".styled-select").each(function(){
		updateSelect($(this));
	});

	$(".styled-select select").on("change", function(){
		updateSelect($(this).parents(".styled-select"));
	});

	$("a.email-type").each(function(){
		var email = $(this).text();
		$(this).attr("href", email);
	});

	$(window).on("load", function(){
		new WOW().init();

		$(".owl-buttons div").addClass("transition");
		$(".owl-pagination").addClass("visible-xs");

		$("#check-btn").wrap('<div class="field-wrap"></div>').addClass("btn btn-default w100");

	});

	$(window).on("load resize", function(){

		$(".header .equal-height").matchHeight();
		$(".section .equal-height").matchHeight();
		$(".footer-box").matchHeight();
		$(".price .equal-height").matchHeight();
		setTimeout(function(){
			$(".news-title").matchHeight();
			$(".news-description").matchHeight();
		}, 500);

		if($(window).width() < 1200){
			$(".about-pic1").addClass("about-pic1-collapse");
			$(".about-pic2").addClass("about-pic2-collapse");
		} else {
			$(".about-pic1").removeClass("about-pic1-collapse");
			$(".about-pic2").removeClass("about-pic2-collapse");
		}

		$(".map-contact").css({
			"left" : $("#map-contact-landmark").offset().left + "px",
			"display" : "block"
		});

		var news_tooltip_right = 100;
		var news_tooltip_pos = $("#first-inner").position().left;
		if(news_tooltip_pos < 100){
			news_tooltip_right = news_tooltip_pos - 10;
		}
		$(".news-tooltip").css({
			"right" : "-" + news_tooltip_right + "px"
		});

		$(".nav-fix").css({
			"height" : $(".top-nav").eq(0).outerHeight() + "px"
		});

	});

	var nav = $(".top-nav");
	$(window).on("scroll", function(){

		if($(window).width() <= 768) return false;

		var scroll_top = $(window).scrollTop();
		var header_height = $(".header").outerHeight() + $("#panel").outerHeight();
		if(scroll_top >= header_height){
			nav.removeClass("navbar-static-top")
				  .addClass("navbar-fixed-top");
		} else {
			nav.removeClass("navbar-fixed-top")
				  .addClass("navbar-static-top");
		}
	});

	function animate(elem){
	    var effect = elem.data("effect");
	    if(!effect || elem.hasClass(effect)) return false;
	    elem.addClass(effect);
	    setTimeout( function(){
	        elem.removeClass(effect);
	    }, 1000);
	}
	 
	$(".animated").mouseenter(function() {
	    animate($(this));
	});

	$(".specialists .item").on("click", function(){

		// /if($(window).width() <= 768) return false;

		var target = $(this).data("target");
		$(".full-info").css({
			"display":"block"
		});
		$(".specialist").slideUp();
		$(target).slideDown();
	});

	$(".collapse-full-info").on("click", function(e){
		e.preventDefault();
		$(".full-info").slideUp(300, function(){
			$(".specialist").css({
				"display":"none"
			});
		});
	});

	function onScroll(event){

		var scrollPosition = $(document).scrollTop();
		$('.nav a:not(".nav-tabs a")').each(function () {
			var currentLink = $(this);
			var refElement = $(currentLink.attr("href"));
			if (refElement.position().top <= scrollPosition+50 && refElement.position().top + refElement.outerHeight() > scrollPosition) {
				$('nav ul li a').removeClass("active");
				currentLink.addClass("active");
			}
			else{
				currentLink.removeClass("active");
			}
		});

	}

	$(document).on("scroll", onScroll);

	$('.nav a[href^="#"]:not(".nav-tabs a")').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll");

		$('a').each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active');

		var target = this.hash;
		$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.position().top - $(".top-nav").outerHeight() + 1
		}, 500, 'swing', function () {
			window.location.hash = target;
			$(document).on("scroll", onScroll);
		});

	});

	$("[data-scroll]").click(function(e){
		e.preventDefault();
		var target = $($(this).data("scroll"));
		if(target.length > 0){
			$('html, body').stop().animate({
				'scrollTop': target.position().top - $(".top-nav").outerHeight() + 1
			}, 500, 'swing');
		}
	});

	$(".select-tariff").hover(function(){
		$(this).find(".btn-order").stop().fadeIn(300);
		var target = $(this).data("target");
		$(target).stop().fadeIn(300);
		$(this).addClass("select-tariff-hover");
	}, function(){
		$(this).find(".btn-order").stop().fadeOut(300);
		var target = $(this).data("target");
		$(target).stop().fadeOut(300);
		$(this).removeClass("select-tariff-hover");
	});

	$(".price .equal-height").hover(function(){
		$(".alert-description").stop().animate({
			"opacity":"0"
		});
	}, function(){
		$(".alert-description").stop().animate({
			"opacity":"1"
		});
	});

	$('a[data-toggle="tab"]').on('click', function (e) {    
	    e.preventDefault();
	      $(this).tab('show');
	});

	$(".btn-ajax-send").click(function(){
		var errors = [];
		var require_error = false;
		var form = $(this).parents("form");
		form.find(".alert").remove();
		form.find("input[data-require]").each(function(){
			if($(this).val() == ""){
				errors.push(empty_msg[$(this).data("type")]);
				$(this).addClass("error-field");
				require_error = true;
			}
		});

		if(require_error){
			form.prepend(getErrorHTML(errors));
			return false;
		}

		var incorrect_error = false;
		form.find("input[data-type]").each(function(){
			switch($(this).data("type")){
				case "phone":
					if(!isPhone($(this).val())){
						errors.push(incorrect_msg[$(this).data("type")]);
						incorrect_error = true;
						$(this).addClass("error-field");
					}
				break;
				case "email":
					if(!isEmail($(this).val())){
						errors.push(incorrect_msg[$(this).data("type")]);
						incorrect_error = true;
						$(this).addClass("error-field");
					}
				break;
			}
		});


		if(incorrect_error){
			form.prepend(getErrorHTML(errors));
			return false;
		}

		var attach = form.find("input[type=file]");
		if(attach.length > 0 && attach.parents(".file-wrap").find(".attach-file").text() != ""){
			attach.parents(".btn-file").next("button").click();
			current_form = form;
		} else {
			ajaxRequest(form, form.serialize());
		}
	});

	$('.modal').on('hidden.bs.modal', function() {
		var form = $(this).find("form");
		form.find(".alert").remove();
		var h3 = form.parents(".modal-content").find(".modal-title");
		h3.text(h3.data("default"));
		form.find("textarea[data-default], input[data-default]").each(function(){
			$(this).attr("placeholder", $(this).data("default"));
		});
		resetForm(form);
	});

	$('.modal').on('shown.bs.modal', function (e) {
		$(this).find("input[type=text], textarea").each(function(){
			$(this).focus().blur();
		});
	})

	$("input, select, textarea").focus(function(){
		if($(this).hasClass("error-field")){
			$(this).removeClass("error-field");
		}
	});

	var btn_file_num = 1,
	    btn_id;
	$('.fileupload').each(function(){
		btn_id = "btn-file-send-" + btn_file_num;
		$(this).attr("data-position", btn_file_num);
		$(this).parents(".file-wrap").find(".attach-file").attr("id", "attach-file-" + btn_file_num);
		$(this).parents(".btn-file").after('<button type="button" class="hidden" id="' + btn_id + '">Upload</button>');
		$(this).fileupload({
	        dataType: 'json',
	        add: function (e, data) {
	        	data.context = $("#btn-file-send-" + $(this).data("position"))
	            .click(function () {
	                data.submit();
	            });
	        },
	        done: function (e, data) {
	        	var filename;
	            $.each(data.result.files, function (index, file) {
                   filename = file.name
                });

	            ajaxRequest(current_form, current_form.serialize() + "&file=" + filename);
	            current_form = {};
	        }
	    }).bind("fileuploadadd", function(e, data){
	    	var position = $(this).data("position");
	    	$.each(data.files, function (index, file) {
	    	    $("#attach-file-" + position).text(file.name);
	    	});
	});

	    btn_file_num++;
	});

	$("#pick_sub_group").chained("#pick_group");

	var show_news = true;
	$(".news-tooltip").css({
		opacity: 0.1
	}).addClass("fadeInUp").animate({
		opacity: 1
	});
	$(window).on("scroll", function(){
		clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {
	    	var scroll_top = $(window).scrollTop();
	    	var tooltip_top = 0; //$(".news-tooltip").offset().top; Система +
	    	$(".news-tooltip").removeClass("fadeInUp");
	        if(scroll_top + 150 > tooltip_top){
	        	if(show_news){
	        		show_news = false;
	        		$(".news-tooltip").addClass("fadeOutDown").animate({
	        			opacity: 0
	        		});
	        		setTimeout(function(){
	        			$(".news-tooltip").removeClass("fadeOutDown");
	        		}, 800);
	        	}
	        } else {
	        	if(!show_news){
	        		show_news = true;
	        		$(".news-tooltip").css({
	        			opacity: 0.1
	        		}).addClass("fadeInUp").animate({
	        			opacity: 1
	        		});
	        		setTimeout(function(){
	        			$(".news-tooltip").removeClass("fadeInUp");
	        		}, 800);
	        	}
	        }
	    }, 250));
	});

	$(".close-news-tooltip").click(function(){
		$(".news-tooltip").addClass("fadeOutDown").animate({
			opacity: 0
		})
		setTimeout(function(){
			$(".news-tooltip").addClass("hidden");
		}, 800);
	});

	$("img").each(function(){
		$(this).removeAttr("height").removeAttr("width");
	});

	$(".at-edit-fix div[id^=bx_incl_area_]").each(function(){
		$(this).css({
			"display" : "inline-block"
		});
	});

});