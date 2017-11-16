jQuery(document).ready(function() {

    //DOUBLE TAP START 
	(function(jQuery){

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

	})(jQuery);
	//DOUBLE TAP END

	

	//APPEND START
	$('body').on('click', '.bakeri_arrow_expand', function(){	
		$('body').css('position','fixed');
		$('body').css('overflow-y','hidden');
		$(".bakeri_fullscreen").addClass('bakeri_display_block');
		$(".bakeri_image_gallery").addClass('bakeri_zoom_gallery');
		$(".slide-main").addClass('slide_zoom_main');
		$(".bakeri_img_box").addClass('bakeri_display_none');
		$(".bakeri_arrow_expand").addClass('bakeri_display_none');
		$(".bakeri_more_views").addClass('bakeri_display_block');
	    $(".bakeri_more_views").addClass('bakeri_more_views_thumb');	    
	    $(".bakeri_zoom_sign").removeClass('bakeri_display_none');
	    $(".bakeri_zoom_sign").addClass('bakeri_display_block');
		var bakeri_html = $(".bakeri_product_zoom").html();
        $(".bakeri_fullscreen").append(bakeri_html);
    });

    $('body').on('click', '.bakeri_arrow_shrink', function(){	
    	$('body').css('position','static');
		$('body').css('overflow-y','visible');
        $(".bakeri_fullscreen").removeClass('bakeri_display_block');
		$(".bakeri_image_gallery").removeClass('bakeri_zoom_gallery');
		$(".slide-main").removeClass('slide_zoom_main');
		$(".bakeri_img_box").removeClass('bakeri_display_none');
		$(".bakeri_arrow_expand").removeClass('bakeri_display_none');
		$(".bakeri_zoom_sign").removeClass('bakeri_display_block');
	    $(".bakeri_zoom_sign").addClass('bakeri_display_none');
	    $('.slide-main').removeClass('bakeri_first_zoom');
	    $(".bakeri_more_views").removeClass('bakeri_display_block');
	    $(".bakeri_more_views").addClass('bakeri_display_none');
	    $('.bakeri_more_views').removeClass('bakeri_more_views_thumb');
        $(".bakeri_fullscreen").html('');
    });
	//APPEND END
   
    //FULLSCREEN START
	var count = 0;
    jQuery('body').on('doubletap', '.bakeri_plus_sign', function(event){
     count++;
    if(count==1){
		$('.bakeri_main_image').removeClass('slide_zoom_main');	
		$('.bakeri_main_image').addClass('bakeri_first_zoom');
    }
    else if(count==2){
    	$('.bakeri_main_image').removeClass('slide_zoom_main');	
		$('.bakeri_main_image').removeClass('bakeri_first_zoom');
		$('.bakeri_main_image').addClass('bakeri_second_zoom');
    }
    });

    $('body').on('doubletap', '.bakeri_minus_sign', function(){
    	$('.bakeri_main_image').removeClass('bakeri_second_zoom');
		$('.bakeri_main_image').removeClass('bakeri_first_zoom');	
		$('.bakeri_main_image').addClass('slide_zoom_main');
    });


    //FULLSCREEN END
   
    //SWIPE START 
    /*var touchsurface = document.getElementById('slide-main'),
        startX,
        startY,
        dist,
        threshold = 150, //required min distance traveled to be considered swipe
        allowedTime = 200, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;
 
    function handleswipe(isrightswipe){
        if (isrightswipe){
	        var imgSrc = $('.slide-main').attr('src');
		    var prevSrc = $('ul img[src="'+imgSrc+'"]').closest('li').prev().find('img').attr('src');
		    prevSrc ==undefined?$('.slide-main').attr('src',$('ul img:first').attr('src')): $('.slide-main').attr('src',prevSrc);
		}
        else{
            var imgSrc = $('.slide-main').attr('src');
		    var nextSrc = $('ul img[src="'+imgSrc+'"]').closest('li').next().find('img').attr('src');
		    nextSrc ==undefined?$('.slide-main').attr('src',$('ul img:first').attr('src')): $('.slide-main').attr('src',nextSrc);
        }
    }
 
    touchsurface.addEventListener('touchstart', function(e){
        touchsurface.innerHTML = ''
        var touchobj = e.changedTouches[0]
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
 
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
 
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
        handleswipe(swiperightBol)
        e.preventDefault()
    }, false)
    */
    //SWIPE END 


    /*var touchsurface = $('.slide-main');
     
    function handleswipe(isrightswipe){
        if (isrightswipe){
	        var imgSrc = $('.slide-main').attr('src');
		    var nextSrc = $('ul img[src="'+imgSrc+'"]').closest('li').next().find('img').attr('src');
		    nextSrc ==undefined?$('.slide-main').attr('src',$('ul li img:first').attr('src')): $('.slide-main').attr('src',nextSrc);
		}
        else{
            var imgSrc = $('.slide-main').attr('src');
		    var nextSrc = $('ul img[src="'+imgSrc+'"]').closest('li').next().find('img').attr('src');
		    nextSrc ==undefined?$('.slide-main').attr('src',$('ul li img:first').attr('src')): $('.slide-main').attr('src',nextSrc);
        }
    }
 
 	var threshold = 150;
    var allowedTime = 200;
    var  dist = 0;
    $("body").on('touchstart', ".slide-main", function(e){
        var touchobj = e.currentTarget;
       
        startX = e.currentTarget.x;

        startY = e.currentTarget.y;

        startTime = new Date().getTime() // record time when finger first makes contact with surface

		dist = touchobj.x - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.y - startY) <= 100)
        handleswipe(swiperightBol);
        e.preventDefault()
    });*/

    //ZOOM START
    var count = 0;

    jQuery('body').on('doubletap', '.bakeri_main_image', function(event){
     count++;
    if(count==1){	
        var x = event.pageX;
	    var y = event.pageY;
		x = x+'px';  y = y+'px';
		var new_val = x+" "+y + " 0";
		jQuery(".bakeri_main_image").attr("style",("transform-origin:"+new_val));
		$('.bakeri_main_image').removeClass('slide_zoom_main');	
		$('.bakeri_main_image').addClass('bakeri_first_zoom');
		$('.bakeri_arrow_shrink').addClass('bakeri_display_none');
		$('.bakeri_plus_sign').addClass('bakeri_display_none');
		$('.bakeri_minus_sign').addClass('bakeri_display_none');
		$('.bakeri_control').addClass('bakeri_display_none');
		$('.bakeri_more_views_thumb').addClass('more_views_thumbs');
        console.log('count0');
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
		console.log('count2');
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
		console.log('count3');
	    count=0;
    }
    })

    $("body").on('touchmove', ".bakeri_main_image", function(e){
        $('.slide-main').addClass('zoom_level_one');
    });
    //ZOOM END

    //DOTS START
	 /*$('.bakeri_dots li').bind('click', function(){
        var index = $(this).index() + 1;
        $(".visible").fadeOut(0);
        $("#slide-" + index).removeClass("invisible");
        $("#slide-" + index).fadeIn(0);     
        $("#slide-" + index).addClass("visible");
        $('.bakeri_dots li.bakeri_selected').removeClass('bakeri_selected');
        $(this).closest('li').addClass('bakeri_selected');

     });*/
    //DOTS END

    //THUMB START
	$('body').on('click', '.bakeri_thumbs_link img', function(){
	    $('.slide-main').attr('src',$(this).attr('src').replace('thumb','1'));
	    $(".bakeri_image_thumbs li").removeClass("thumb_active");
	    $(this).parent().parent().addClass("thumb_active");
    });
    //THUMB END
      
    //NEXT PREV START
	$('body').on('click', '.bakeri_next', function(){
	    var imgSrc = $('.slide-main').attr('src');
	    var nextSrc = $('ul img[src="'+imgSrc+'"]').closest('li').next().find('img').attr('src');
	    nextSrc ==undefined?$('.slide-main').attr('src',$('ul li img:first').attr('src')): $('.slide-main').attr('src',nextSrc);
	    
	    var next = $('.bakeri_dots li.bakeri_selected').removeClass('bakeri_selected').next('li');
	    if (!next.length) next = next.prevObject.siblings(':first');
	    next.addClass('bakeri_selected');

	    var next = $('.bakeri_image_thumbs li.thumb_active').removeClass('thumb_active').next('li');
	    if (!next.length) next = next.prevObject.siblings(':first');
	    next.addClass('thumb_active');
	   
	});

	$('body').on('click', '.bakeri_prev', function(){
	    var imgSrc = $('.slide-main').attr('src');
	    var nextSrc = $('ul img[src="'+imgSrc+'"]').closest('li').next().find('img').attr('src');
	    nextSrc ==undefined?$('.slide-main').attr('src',$('ul li img:first').attr('src')): $('.slide-main').attr('src',nextSrc);
	    
	    var prev = $('.bakeri_dots li.bakeri_selected').removeClass('bakeri_selected').prev('li');
	    if (!prev.length) prev = prev.prevObject.siblings(':last');
	    prev.addClass('bakeri_selected');

	    var prev = $('.bakeri_image_thumbs li.thumb_active').removeClass('thumb_active').prev('li');
	    if (!prev.length) prev = prev.prevObject.siblings(':last');
	    prev.addClass('thumb_active');
	});
	//NEXT PREV END

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
        
var counter = 1;
    $("body" ).on("swipeleft",".bakeri_main_image", function(){
    	
    	var data_bakery = $(this).attr("target_bakery");
    	var last_id = $(".bakeri_image_thumbs li:last").children("a").attr("id");
	    if(data_bakery == ("#"+last_id))
    	{
    		counter = 1;
    		var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;

    		$(this).attr("target_bakery",new_id);
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");

	    	$(".bakeri_dots").attr("data-thumb");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
    		
    	}
    	else
    	{
			counter++;
	    	var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;
    
        	$(this).attr("target_bakery",new_id);
	    
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");

	    	/*var total_thumb = $(".bakeri_dots li").length;
	    	var i;
	    	for(i=1;i<=total_thumb;i++)
	    	{
	    		if($(".bakeri_dots li").attr("data-thumb") == new_id)
		    	{
		    		console.clear();
		    		console.log("Here")
		    		$(this).addClass("bakeri_selected");
		    	}
		    	else
		    	{
		    		$(this).addClass("bakeri_selected");
		    		//$(".bakeri_dots .dot").removeClass("bakeri_selected");
		    	}
	    	}
	    	*/

		}
    	


    });
    $("body" ).on("swiperight",".bakeri_main_image", function(){
    	var data_bakery = $(this).attr("target_bakery");
		var first_id = $(".bakeri_image_thumbs li:first").children("a").attr("id");
    	var last_no_array = $(".bakeri_image_thumbs li:last").children("a").attr("id").split("_");
    	var last_no = last_no_array[1];
	    if(data_bakery == ("#"+first_id))
    	{
    		counter = last_no;
    		var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;

    		$(this).attr("target_bakery",new_id);
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
    		
    	}
    	else
    	{
			counter--;
	    	var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;
    
        	$(this).attr("target_bakery",new_id);
	    
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
	    	$(".bakeri_dots li").removeClass("bakeri_selected");
			$(".bakeri_dots li[data-thumb='"+new_id+"']").addClass("bakeri_selected");
		}
    });


    $('body').on('click', '.bakeri_next', function(){

	    var data_bakery = $(".bakeri_main_image").attr("target_bakery");
    	console.log(data_bakery);
    	var last_id = $(".bakeri_image_thumbs li:last").children("a").attr("id");
	    if(data_bakery == ("#"+last_id))
    	{
    		counter = 1;
    		var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;

    		$(".bakeri_main_image").attr("target_bakery",new_id);
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
    		
    	}
    	else
    	{
			counter++;
	    	var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;
    
        	$(".bakeri_main_image").attr("target_bakery",new_id);
	    
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
		}

	    /*
	    var nextSrc = $('ul img[src="'+imgSrc+'"]').closest('li').next().find('img').attr('src');
	    nextSrc ==undefined?$('.slide-main').attr('src',$('ul li img:first').attr('src')): $('.slide-main').attr('src',nextSrc);
	    
	    var next = $('.bakeri_dots li.bakeri_selected').removeClass('bakeri_selected').next('li');
	    if (!next.length) next = next.prevObject.siblings(':first');
	    next.addClass('bakeri_selected');

	    var next = $('.bakeri_image_thumbs li.thumb_active').removeClass('thumb_active').next('li');
	    if (!next.length) next = next.prevObject.siblings(':first');
	    next.addClass('thumb_active');
	   */
	});

	 $('body').on('click', '.bakeri_prev', function(){
	 	var data_bakery = $(".bakeri_main_image").attr("target_bakery");
		var first_id = $(".bakeri_image_thumbs li:first").children("a").attr("id");
    	var last_no_array = $(".bakeri_image_thumbs li:last").children("a").attr("id").split("_");
    	var last_no = last_no_array[1];
	    if(data_bakery == ("#"+first_id))
    	{
    		counter = last_no;
    		var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;

    		$(".bakeri_main_image").attr("target_bakery",new_id);
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
    		
    	}
    	else
    	{
			counter--;
	    	var image_counter = data_bakery.split("_");
	    	var new_id = "#thumb_"+counter;
    
        	$(".bakeri_main_image").attr("target_bakery",new_id);
	    
	    	$(".bakeri_image_thumbs li").removeClass("thumb_active");
	    	$(new_id).parent("li").addClass("thumb_active");
	    	
	    	var new_src = $(new_id).children("img").attr("slider_src");
	    	
	    	$(".bakeri_main_image").attr("src",new_src);
		}
	 });

	 $("body").on("click",".bakeri_dots .dot",function(){

			$(".bakeri_dots .dot").removeClass("bakeri_selected");	 	
	 		$(this).addClass("bakeri_selected");

	 		var thumb_id = $(this).attr("data-thumb");
	 		console.log(thumb_id);
			var image_src = $(thumb_id).children("img").attr("slider_src");
			console.log(image_src);
			$(".bakeri_main_image").attr("src",image_src);

			$(".bakeri_main_image").attr("target_bakery",thumb_id);




	 });



});


  


