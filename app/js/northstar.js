/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	/**
	 * Northstar JavaScript
	 */

	'use strict';
	(function ($) {
	    window.NST = {};

	    NST.Northstar = {

	        init: function init(settings) {

	            NST.Northstar.config = {
	                items: $('.nst-block-link'),
	                container: null,
	                urlBase: null
	            };
	            $.extend(NST.Northstar.config, settings);

	            NST.Northstar.setup();
	        },
	        setup: function setup() {
	            var _this = this;
	            _this.setUpBlockLinks();
	            _this.setUpExternalLinks();
	            _this.setUpVids();
	            _this.animateStats();
	            _this.playBackgrounds();
	        },

	        setUpBlockLinks: function setUpBlockLinks() {
	            var $links = $('a[class^="nst-block-link"], a[class$="nst-block-link"]');
	            if ($links.length) {

	                $links.each(function (ind, obj) {
	                    var $parent = $(obj).closest('.nst-card, .nst-card-bg, .nst-card-border'),
	                        url = $(obj).attr('href');

	                    $parent.append($('<a>').attr({
	                        'class': 'nst-appended-link',
	                        'href': url
	                    }));
	                });
	            }

	            if ($links.length && !Modernizr.touch) {

	                $('.nst-appended-link').hover(function () {
	                    $(this).closest('.nst-card-bg, .nst-card, .nst-card-border').addClass('hover');
	                }, function () {
	                    $(this).closest('.nst-card,.nst-card-bg, .nst-card-border').removeClass('hover');
	                });
	            }
	        },

	        setUpVids: function setUpVids() {
	            var $buttons = $('.nst-vid-play');

	            if ($buttons.length) {
	                $.each($buttons, function (ind, obj) {

	                    $(obj).on('click', function (e) {
	                        var _targ = $(obj).data('video');
	                        e.preventDefault();
	                        $('#' + _targ + ' a.ibm-video-placeholder').click();
	                    });
	                });
	            }
	        },

	        setUpExternalLinks: function setUpExternalLinks() {
	            $('a[rel=external]').on('click', function (e) {
	                window.open($(this).attr('href'));
	                e.preventDefault();
	            });
	        },

	        playBackgrounds: function playBackgrounds() {
	            var _v = document.querySelector('video');
	            if (typeof _v != 'undefined' && _v != null) {
	                checkAndPlay(_v);
	            };

	            function checkAndPlay(video) {
	                if (video.paused) {
	                    setTimeout(checkAndPlay, 500, video);
	                    video.play();
	                } else {
	                    return false;
	                }
	            };
	        },

	        animateStats: function animateStats() {

	            var runonce = false;
	            $.fn.isFloat = function () {
	                var num = this.data('target');
	                if (num % 1 !== 0) {
	                    return true;
	                } else {
	                    return false;
	                }
	            };

	            var $stats = $('[data-widget="animate-stat"]');

	            if (!$stats.length) {
	                return false;
	            }

	            $stats.each(function (ind, obj) {

	                var $obj = $(obj);

	                var _float;
	                var _target;

	                if ($obj.isFloat()) {

	                    _target = $obj.data('target') * 10;
	                    _float = true;
	                } else {

	                    _float = false;
	                    _target = $obj.data('target');
	                }

	                function scrollHandler() {
	                    if (!runonce && IBMCore.common.util.scrolledintoview($obj)) {
	                        $({
	                            countNum: $obj.text()
	                        }).animate({
	                            countNum: _target
	                        }, {
	                            duration: 1500,
	                            easing: 'linear',

	                            start: function start() {
	                                $(window).off("scroll", scrollHandler);
	                            },

	                            complete: function complete() {
	                                if (_float) {

	                                    _target = _target / 10;
	                                }

	                                $obj.text(_target);

	                                return false;
	                            },

	                            step: function step() {
	                                if (_float) {
	                                    $obj.text(Math.round(this.countNum / 10 * 10) / 10);
	                                } else {
	                                    $obj.text(Math.floor(this.countNum));
	                                }
	                            }
	                        });
	                    }
	                }
	                $(window).scroll(scrollHandler);
	            });
	        }
	    };
	    $(document).ready(NST.Northstar.init());
	})(jQuery);

/***/ }
/******/ ]);