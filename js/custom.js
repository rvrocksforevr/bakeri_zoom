jQuery(document).ready(function() {

    //DOUBLE TAP START 
	/*(function(jQuery){
	  jQuery.event.special.doubletap = {
		bindType: 'touchend',
		delegateType: 'touchend',

		handle: function(event) {
		  var handleObj   = event.handleObj,
			  targetData  = jQuery.data(event.target),
			  now         = new Date().getTime(),
			  delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
			  delay       = delay == null ? 300 : delay;

		  if (delta < delay && delta > 30) {
			targetData.lastTouch = null;
			event.type = handleObj.origType;
			['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
			  event[property] = event.originalEvent.changedTouches[0][property];
			})

			// let jQuery handle the triggering of "doubletap" event handlers
			handleObj.handler.apply(this, arguments);
		  } else {
			targetData.lastTouch = now;
		  }
		}
	  };

	})(jQuery);*/
	//DOUBLE TAP END

	var zoom_page_click = function(){
		console.log("console coming till here");
		$('#imageFullScreen').smartZoom({'containerClass':'zoomableContainer'});
		$('#topPositionMap,#leftPositionMap,#rightPositionMap,#bottomPositionMap').bind("click", moveButtonClickHandler);
	    $('#zoomInButton,#zoomOutButton').bind("click", zoomButtonClickHandler);
	}

	function zoomButtonClickHandler(e){
	    var scaleToAdd = 0.8;
	    if(e.target.id == 'zoomOutButton')
	    scaleToAdd = -scaleToAdd;
	    $('#imageFullScreen').smartZoom('zoom', scaleToAdd);
	    }
	    
	function moveButtonClickHandler(e){
	    var pixelsToMoveOnX = 0;
	    var pixelsToMoveOnY = 0;

	    switch(e.target.id){
	    case "leftPositionMap":
	    pixelsToMoveOnX = 50;
	    break;
	    case "rightPositionMap":
	    pixelsToMoveOnX = -50;
	    break;
	    case "topPositionMap":
	    pixelsToMoveOnY = 50;
	    break;
	    case "bottomPositionMap":
	    pixelsToMoveOnY = -50;
	    break;
	    }
	    $('#imageFullScreen').smartZoom('pan', pixelsToMoveOnX, pixelsToMoveOnY);
	    }
	
	var bakeri_html = $(".bakeri_product_zoom").html();
	//APPEND START
	$('body').on('click', '.bakeri_arrow_expand', function(){	
		$('body').css('position','fixed');
		$('body').css('overflow-y','hidden');
		$(".bakeri_fullscreen").append(bakeri_html);
		$(".bakeri_fullscreen").addClass('bakeri_display_block');
		$(".bakeri_image_gallery").addClass('bakeri_zoom_gallery');
		$(".slide-main").addClass('bakeri_main_image');
		$(".slide-main").addClass('slide_zoom_main');
		$(".bakeri_img_box").addClass('bakeri_display_none');
		$(".bakeri_arrow_expand").addClass('bakeri_display_none');
		$(".bakeri_more_views").addClass('bakeri_display_block');
	    $(".bakeri_more_views").addClass('bakeri_more_views_thumb');	    
	    $(".bakeri_zoom_sign").removeClass('bakeri_display_none');
	    $(".bakeri_zoom_sign").addClass('bakeri_display_block');
		
        

        $(".bakeri_image_gallery").addClass("bakery_cont_outer");
        $(".bakeri_fullscreen .bakeri_image_gallery.bakery_cont_outer").attr("id","imgContainer");
        $(".bakeri_fullscreen .slide-main.bakeri_main_image").attr("id","imageFullScreen");

        zoom_page_click();
        $('.bakeri_message').show();
        setTimeout(function() {
            $('.bakeri_message').hide();
         }, 2000);
    });

    $('body').on('click', '.bakeri_arrow_shrink', function(){	
    	$('body').css('position','static');
		$('body').css('overflow-y','visible');
        $(".bakeri_fullscreen").removeClass('bakeri_display_block');
		$(".bakeri_image_gallery").removeClass('bakeri_zoom_gallery');
		$(".slide-main").removeClass('bakeri_main_image');
		$(".slide-main").removeClass('slide_zoom_main');
		$(".bakeri_img_box").removeClass('bakeri_display_none');
		$(".bakeri_arrow_expand").removeClass('bakeri_display_none');
		$(".bakeri_zoom_sign").removeClass('bakeri_display_block');
	    $(".bakeri_zoom_sign").addClass('bakeri_display_none');
	    $('.slide-main').removeClass('bakeri_first_zoom');
	    $(".bakeri_more_views").removeClass('bakeri_display_block');
	    $(".bakeri_more_views").addClass('bakeri_display_none');
	    $('.bakeri_more_views').removeClass('bakeri_more_views_thumb');
	    $(".bakeri_main_image").css({"left": "50%", "top": "50%"});
        $(".bakeri_fullscreen").html('');
    });
	//APPEND END

   
    
    //ZOOM START

    increse_bakery_cont = function(){

    }
    var count = 0;

    jQuery('body').on('doubletap', '.bakeri_main_image', function(event){
     count++;
    if(count==1){	
        var x = event.pageX;
	    var y = event.pageY;
		var new_val = x+" "+y + " 0";

		console.log(new_val);
		
		$('.bakeri_main_image').removeClass('slide_zoom_main');	
		$('.bakeri_main_image').addClass('center_origin');
		$('.bakeri_arrow_shrink').addClass('bakeri_display_none');
		$('.bakeri_plus_sign').addClass('bakeri_display_none');
		$('.bakeri_minus_sign').addClass('bakeri_display_none');
		$('.bakeri_control').addClass('bakeri_display_none');
		$('.bakeri_more_views_thumb').addClass('more_views_thumbs');
        
    }
    else if(count==2){	
		$('.bakeri_main_image').removeClass('slide_zoom_main');
		$('.bakeri_main_image').removeClass('bakeri_first_zoom');	
		$('.bakeri_main_image').addClass('bakeri_second_zoom');
		$('.bakeri_arrow_shrink').addClass('bakeri_display_none');
		$('.bakeri_plus_sign').addClass('bakeri_display_none');
		$('.bakeri_minus_sign').addClass('bakeri_display_none');
		$('.bakeri_control').addClass('bakeri_display_none');
		$('.bakeri_more_views_thumb').addClass('more_views_thumbs');
		$('.bakeri_main_image').removeClass('zoom_level_one');
		$("body").on('touchmove', ".bakeri_second_zoom", function(e){
        $(".bakeri_second_zoom").draggable();
        });
    }
    else if(count==3){
		$('.bakeri_main_image').addClass('slide_zoom_main');
		$('.bakeri_main_image').removeClass('bakeri_first_zoom');	
		$('.bakeri_main_image').removeClass('bakeri_second_zoom');
		$('.bakeri_arrow_shrink').removeClass('bakeri_display_none');
		$('.bakeri_plus_sign').removeClass('bakeri_display_none');
		$('.bakeri_minus_sign').removeClass('bakeri_display_none');
		$('.bakeri_control').removeClass('bakeri_display_none');
		$('.bakeri_more_views_thumb').removeClass('more_views_thumbs');
		$(".bakeri_main_image").css({"left": "50%", "top": "50%"});
	    count=0;
    }
    })

    //ZOOM END



    //FULLSCREEN START
	var count = 0;
    jQuery('body').on('doubletap', '.bakeri_plus_sign', function(event){
     count++;
    if(count==1){
		$('.bakeri_main_image').removeClass('slide_zoom_main');	
		$('.bakeri_main_image').addClass('bakeri_first_zoom');
	    $("body").on('touchmove', ".bakeri_product_image", function(e){
        $(".bakeri_product_image").draggable();
        });
    }
    else if(count==2){
    	$('.bakeri_main_image').removeClass('slide_zoom_main');	
		$('.bakeri_main_image').removeClass('bakeri_first_zoom');
		$('.bakeri_main_image').addClass('bakeri_second_zoom');
    	$("body").on('touchmove', ".bakeri_main_image", function(e){
        $(".bakeri_second_zoom").draggable();
        });
    }
    });

    $('body').on('doubletap', '.bakeri_minus_sign', function(){
    	$('.bakeri_main_image').removeClass('bakeri_second_zoom');
		$('.bakeri_main_image').removeClass('bakeri_first_zoom');	
		$('.bakeri_main_image').addClass('slide_zoom_main');
		$('.bakeri_main_image').removeClass('zoom_level_one');
		$('.bakeri_main_image').removeClass('zoom_level_two');
    });
    //FULLSCREEN END



    //THUMB START
	$('body').on('click', '.bakeri_thumbs_link img', function(){
	    $('.slide-main').attr('src',$(this).attr('src').replace('thumb','1'));
	    $(".bakeri_image_thumbs li").removeClass("thumb_active");
	    $(this).parent().parent().addClass("thumb_active");
    });
    //THUMB END
      
   /*Add to cart button*/
	var pos = $(".bakeri_static_button").position().top;

    $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll > pos) {
    	$(".bakeri_static_button").addClass("bakeri_both_button");
    	$(".bakeri_both_button").removeClass("bakeri_static_button"); 
    }
    else{
        $(".bakeri_static_button").removeClass("bakeri_both_button");
        $(".bakeri_both_button").addClass("bakeri_static_button");
        }
    });
    


    $('body').on('click', '.bakeri_next', function(){

	    var data_bakery = $(".slide-main").attr("target_bakery");
    	//console.log(data_bakery);
    	var last_id = $(".bakeri_image_thumbs li:last").children("div").attr("class");
	    if(data_bakery == ("."+last_id))
    	{
    		counter = 1;
    		var image_counter = data_bakery.split("_");
	    	var new_id = ".thumb_"+counter;

    		$(".slide-main").attr("target_bakery",new_id);
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".slide-main").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
    		
    	}
    	else
    	{
			counter++;
	    	var image_counter = data_bakery.split("_");
	    	var new_id = ".thumb_"+counter;
    
        	$(".slide-main").attr("target_bakery",new_id);
	    
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".slide-main").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
		}

	    
	});

	 $('body').on('click', '.bakeri_prev', function(){
	 	var data_bakery = $(".slide-main").attr("target_bakery");
		var first_id = $(".bakeri_image_thumbs li:first").children("div").attr("class");
    	var last_no_array = $(".bakeri_image_thumbs li:last").children("div").attr("class").split("_");
    	var last_no = last_no_array[1];
	    if(data_bakery == ("."+first_id))
    	{
    		counter = last_no;
    		var image_counter = data_bakery.split("_");
	    	var new_id = ".thumb_"+counter;

    		$(".slide-main").attr("target_bakery",new_id);
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".slide-main").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
    		
    	}
    	else
    	{
			counter--;
	    	var image_counter = data_bakery.split("_");
	    	var new_id = ".thumb_"+counter;
    
        	$(".slide-main").attr("target_bakery",new_id);
	    
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".slide-main").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
		}
	 });

	 $("body").on("click",".bakeri_dots .dot",function(){

			$(".bakeri_dots .dot").removeClass("bakeri_selected");	 	
	 		$(this).addClass("bakeri_selected");
	 		var thumb_id = $(this).attr("data-thumb");
			var image_src = $(thumb_id).children("img").attr("slider_src");
			$(".slide-main").attr("src",image_src);
			$(".slide-main").attr("target_bakery",thumb_id);

	 });


	 $("body").on("click",".bakeri_image_thumbs .thumbs",function(){

			$(".bakeri_image_thumbs .thumbs").removeClass("thumb_active");	 	
	 		$(this).addClass("thumb_active");

	 		var thumb_id = $(this).attr("bakeri-thumb");
			var image_src = $(thumb_id).children("div img").attr("slider_src");

			$(".slide-main").attr("src",image_src);

			$(".slide-main").attr("target_bakery",thumb_id);

	 });
    /*Smallworld New Javascript Work Ends*/
    

    //SWIPE START
    var counter = 1;
    $(function() {      
      $(".slide-main").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          if (direction == "left") {
            console.log('swipe left');
            var data_bakery = $(this).attr("target_bakery");
	    	var last_id = $(".bakeri_image_thumbs li:last").children("div").attr("class");
	    	
		    if(data_bakery == ("."+last_id))
	    	{
	    		counter = 1;
	    		var image_counter = data_bakery.split("_");
		    	var new_id = ".thumb_"+counter;

		    	//console.log(new_id);

	    		$(this).attr("target_bakery",new_id);
		    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
		    	$(new_id).parent("li").addClass("thumb_active");
		    	
		    	var new_src = $(new_id).children("img").attr("slider_src");

		    	$(".bakeri_dots").attr("data-thumb");
		    	
		    	$(".slide-main").attr("src",new_src);
		    	$(".bakeri_dots li").removeClass("bakeri_selected");
				$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
	    		
	    	}
	    	else
	    	{
				counter++;
		    	var image_counter = data_bakery.split("_");
		    	var new_id = ".thumb_"+counter;
	    
	        	$(this).attr("target_bakery",new_id);
		    
		    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
		    	$(new_id).parent("li").addClass("thumb_active");
		    	
		    	var new_src = $(new_id).children("img").attr("slider_src");
		    	
		    	$(".slide-main").attr("src",new_src);
		    	$(".bakeri_dots li").removeClass("bakeri_selected");
				$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");

			}
        } else if (direction == "right") {
            console.log('swipe right');
            var data_bakery = $(this).attr("target_bakery");
			var first_id = $(".bakeri_image_thumbs li:first").children("div").attr("class");
	    	var last_no_array = $(".bakeri_image_thumbs li:last").children("div").attr("class").split("_");
	    	var last_no = last_no_array[1];
		    if(data_bakery == ("."+first_id))
	    	{
	    		counter = last_no;
	    		var image_counter = data_bakery.split("_");
		    	var new_id = ".thumb_"+counter;

	    		$(this).attr("target_bakery",new_id);
		    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
		    	$(new_id).parent("li").addClass("thumb_active");
		    	
		    	var new_src = $(new_id).children("img").attr("slider_src");
		    	
		    	$(".slide-main").attr("src",new_src);
		    	$(".bakeri_dots li").removeClass("bakeri_selected");
				$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
	    		
	    	}
	    	else
	    	{
				counter--;
		    	var image_counter = data_bakery.split("_");
		    	var new_id = ".thumb_"+counter;
	    
	        	$(this).attr("target_bakery",new_id);
		    
		    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
		    	$(new_id).parent("li").addClass("thumb_active");
		    	
		    	var new_src = $(new_id).children("img").attr("slider_src");
		    	
		    	$(".slide-main").attr("src",new_src);
		    	$(".bakeri_dots li").removeClass("bakeri_selected");
				$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
			}
        }
        },
        threshold:0,
        fingers:'all'
      });
    }); 
    //SWIPE END 
	
});


  


