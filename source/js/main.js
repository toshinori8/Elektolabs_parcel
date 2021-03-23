
import $ from 'jquery'
globalThis.jQuery = $
import { encode } from "universal-base64";

$.fn.isFullyInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementTop >= viewportTop && elementBottom <= viewportBottom;
};

jQuery(document).ready(function(){
	"use strict";


    $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    // Do something

    if ($(".topbanner").isFullyInViewport()) {
      $(".homeButton").fadeOut();

  
    }else{

        $(".homeButton").fadeIn();
	    }
});

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;


    $(document).ready(function(){
    $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);


     // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function(e){
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });


document.getElementById("myForm_name").onclick = function(){

  document.getElementById("myForm_human").value = 'human';

};


     $(document).ready(function() {


     

        var form = $('#myForm');
        var submitBox = $('.submit-btn'); 
        var alertBox = $('.alert-msg'); 





        // form submit event
        form.on('submit', function(e) {
            e.preventDefault();


         



            var name = document.getElementById("myForm_name").value;
            var emaile = document.getElementById("myForm_email").value;
            var text = document.getElementById("myForm_text").value;
            var jSOn = '{"fname":"'+name+'","email":"'+emaile+'","message":"'+text+'"}';
				    var stringSend= encode(jSOn);
				

		
				
				var data ={
					'data': stringSend
					}
				
				
				
				

			
            $.ajax({
                url: 'mail.php', // form action url
                type: 'GET', // form submit method get/post
                dataType: 'JSON',
				        contentType: 'application/json', // request type html/json/xml
                
                data: data,
                beforeSend: function() {
                    alertBox.fadeOut();
                    submitBox.html('Wysyłanie....'); // change submit button text
                },
                success: function(data) {
	                
	                if(data["statusCode"]==200){
                    $('.alert-msg').html('Wysłano').fadeIn().removeAttr("style").css({'font-size':'20px', 'color':'black!important' });
		                
	                }
	                
                  $('.alert-msg').html('<h4>wysłano</h4>').fadeIn().show();

                    // fade in response data
                    //form.trigger('reset'); // reset form
                    submitBox.attr("style", "display: none !important"); // reset submit button text
                },
                error: function(e) {
                
                    
                    submitBox.attr("style", "display: block !important");
                    $('.alert-msg').html('<h4>błąd wysyłania</h4>').fadeIn().show();
                    submitBox.html(e); 

                    
                }
            });
        });
    });
 });

