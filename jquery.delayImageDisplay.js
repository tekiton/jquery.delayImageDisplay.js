/**
 * jQuery.delayImageDisplay.js
 *
 * @author  a.matsui
 * @version 1.0.0
 * @license MIT License :)
 */
;(function($){

	$.fn.delayImageDisplay = function(option){

		option = $.extend({
			duration   : null,
			offset     : -300,
			position   : 'bottom',
			eventSuffix: '.delayImageDisplay'
		}, option);

		var $self        = this.fadeTo(0, 0);
		var windowHeight = $(window).height();
		var scrollTop    = $(window).scrollTop();
		var scrollMiddle = scrollTop + (windowHeight/2);
		var scrollBottom = scrollTop + windowHeight;

		var resizeHandler = function(){
			windowHeight = $(window).height();
		};
		$(window).on('resize'+option.eventSuffix, $.throttle? $.throttle(250, resizeHandler): resizeHandler);

		var scrollHandler = function(){

			scrollTop    = $(window).scrollTop();
			scrollMiddle = scrollTop + (windowHeight/2);
			scrollBottom = scrollTop + windowHeight;

			$self.each(function(){

				var $img = $(this);
				if( $img.is(':animated') || parseInt($img.css('opacity'))===1 ) return;

				var top  = $img.offset().top;

				switch(option.position){
					case 'center':
					case 'middle':
						if(scrollMiddle+option.offset>top){
							$img.fadeTo(option.duration, 1);
						}
					break;
					case 'bottom':
					default:
						if(scrollBottom+option.offset>top){
							$img.fadeTo(option.duration, 1);
						}
					break;
				}

			});

		};
		$(window).on('load'+option.eventSuffix, function(){
			$(window).on('scroll'+option.eventSuffix, $.throttle? $.throttle(250, scrollHandler): scrollHandler);
			scrollHandler();
		});

		return $self;

	};

})(jQuery);
