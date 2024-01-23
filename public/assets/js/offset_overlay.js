// Cart Offset Sidebar Overlay
jQuery(document).ready(function ($) {
	$(document).on('click', '.pull-bs-canvas-right, .pull-bs-canvas-left', function () {
		$('body').prepend('<div id="wrapperModel" class="bs-canvas-overlay bg-dark position-fixed w-100 h-100"></div>');
		if ($(this).hasClass('pull-bs-canvas-right'))
			$('.bs-canvas-right').addClass('mr-0');
		else
			$('.bs-canvas-left').addClass('ml-0');
		return false;
	});


	$(document).on('click', '.close_bg_wrapper', function () {
		$('#wrapperModel').remove();
		if ($(this).hasClass('pull-bs-canvas-right'))
			$('.bs-canvas-right').addClass('mr-0');
		else
			$('.bs-canvas-left').addClass('ml-0');
		return false;
	});

	$(document).on('click', '.bs-canvas-close, .bs-canvas-overlay', function () {
		var elm = $(this).hasClass('bs-canvas-close') ? $(this).closest('.bs-canvas') : $('.bs-canvas');
		elm.removeClass('mr-0 ml-0');
		$('.bs-canvas-overlay').remove();
		return false;
	});
});