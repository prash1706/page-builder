/* global Modernizr */
/* global IBM */
(function($){
	'use strict';

	function disableEmptyLinks(){
		var $links = $('a');

		//console.log($links.length);
		$links.each(function(ind, obj){
			var $obj = $(obj);
			if($obj.attr('href')==='#'){
				$obj.click(function(e){
					e.preventDefault();
				})
			}
		});
	}

	function parsePhoneNumber(){

		if ($('.nst-phone').length<=0) {
			return;
		}

		var phone = $('.nst-phone').html();

		if(phone.length>0){

			var r = /(\D+)/g,
	        npa = '',
	        nxx = '',
	        last4 = '';
	    	phone = phone.replace(r, '');
	    	npa = phone.substr(0, 3);
	    	nxx = phone.substr(3, 3);
	    	last4 = phone.substr(6, 4);
	    	phone = npa + '-' + nxx + '-' + last4;

	    	$('.nst-phone').html(phone);
    	}
	}


	function setUpExternalLinks(){
		  $('a[rel=external]').on('click', function(e) {
            window.open($(this).attr('href'));
            e.preventDefault();
        });
	}

	function setUpBlockLinks(){

		var $links = $('.nst-block-link');

		$links.each(function(ind, obj){
			var $parent = $(obj).closest('.nst-card'),
			url = $(obj).attr('href');

			$parent.append($('<a>').attr({
				'class' : 'nst-appended-link',
				'href' : url,
				'rel' : 'external'
			}));

		});

		if (!Modernizr.touch) { 

		$('.nst-appended-link').hover(function(){
			$(this).closest('.nst-card').addClass('hover');
		},function(){
			$(this).closest('.nst-card').removeClass('hover');
		})
		}
	}

	$(document).ready(function(){


		setUpBlockLinks();
		disableEmptyLinks();
		parsePhoneNumber();
		setUpExternalLinks();


	})

	$(window).resize(function(){
 		$('[data-widget=setsameheight]').setsameheight();
   		
   	});


	

}(jQuery));




/* global IBMCore */
'use strict';
(function($){
	
	var runonce = false;

	$.fn.isFloat= function(){
		var num = this.data('target');
	 	if(num % 1 !== 0){
	 		return true;
	 	}else{
	 		return false;
	 	}
	};


	$(document).ready(function(){

		var $nums = $('.custom-case-study-badge .counter');

		$nums.each(function(ind, obj){
			var $obj = $(obj);

			var _float;
			var _target;
			
			if($obj.isFloat()){
				_target = $obj.data('target')*10;
				_float = true;
			}else {

				_float = false;
				_target = $obj.data('target');
			}


			function scrollHandler(){
				if (!runonce && IBMCore.common.util.scrolledintoview($obj)) {
						$({countNum: $obj.text()}).animate({countNum: _target}, {
							duration: 1500,
							easing: 'linear',

							start : function(){
								$(window).off("scroll", scrollHandler);
							},
							
							complete : function(){
								if(_float){

									_target = _target/10;
								
								}
								
								$obj.text(_target);

								

								return false;
							},

							step : function(){
								if(_float){
									$obj.text(Math.round((this.countNum/10)*10)/10);
								}else{
									$obj.text(Math.floor(this.countNum));
								}	
							}
						});
					}

			}
			
			(function(){
				$(window).scroll(scrollHandler);
			})();
		})
	})
}(jQuery));