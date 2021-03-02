(function($) {
    "use strict";

    /*-------------------------------------
    Cart Dropdown
    --------------------------------------*/
    function sideMenuToggle(selectbtn, openElement) {

        $('#wrapper').on('click', selectbtn, function(e) {
            e.preventDefault();

            var $this = $(this),
                wrapp = $this.parents('body').find('#wrapper'),
                wrapMask = $('<div / >').addClass('closeMask'),
                cartDropdown = $(openElement);

            if (!(cartDropdown).hasClass('open')) {
                wrapp.addClass('open').append(wrapMask);
                cartDropdown.addClass('open');

            } else {
                removeSideMenu();
            }

            function removeSideMenu() {
                wrapp.removeClass('open').find('.closeMask').remove();
                cartDropdown.removeClass('open');
            }

            $('.sidebar-close, .closeMask').on('click', function() {
                removeSideMenu();
            });

        });
    }

    sideMenuToggle(".cart-dropdown-btn", "#cart-dropdown");

    sideMenuToggle(".mobile-side-menu", ".sidebar-nav");

    // Mobile Sidemenu Class Add
    function resizeClassAdd() {
        if (window.matchMedia('(max-width: 1369px)').matches) {
            $('.sidebar-menu-title').addClass('mobile-side-menu');
            $('.megamenu').addClass('megamenu-mobile-toggle');
        } else {
            $('.sidebar-menu-title').removeClass('mobile-side-menu');
            $('.megamenu').removeClass('megamenu-mobile-toggle');
        }
    }

    $(window).resize(function() {
        resizeClassAdd();
    });
    resizeClassAdd();

    /*-------------------------------------
    Mobile side menu Dropdown
    --------------------------------------*/
    $('#wrapper').on('click', '.nav-link.has-megamenu', function(e) {
        e.preventDefault();
        var $this = $(this),
            targetElm = $this.siblings('.megamenu-mobile-toggle');
        targetElm.toggle();
    });

    /*-------------------------------------
    Mobile Main Menu Show
    --------------------------------------*/
    $('header').on('click', '.mobile-menu-toggler', function(e) {
        e.preventDefault();

        var $this = $(this),
            targetField = $('.main-menu');

        if (!targetField.hasClass('open')) {
            targetField.addClass('open');
            $this.addClass('open');
        } else {
            targetField.removeClass('open');
            $this.removeClass('open');
        }

    });

    /*-------------------------------------
    Quantity Holder
    -------------------------------------*/
    $(document).on('click', '.quantity-plus', function() {
        var $holder = $(this).parents('#quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity > 0) {
            $quantity = $quantity + 1;
            $target.val($quantity);
        } else {
            $target.val($quantity);
        }

    }).on('click', '.quantity-minus', function() {

        var $holder = $(this).parents('#quantity-holder');
        var $target = $holder.find('input.quantity-input');
        var $quantity = parseInt($target.val(), 10);
        if ($.isNumeric($quantity) && $quantity >= 2) {
            $quantity = $quantity - 1;
            $target.val($quantity);
        } else {
            $target.val(1);
        }

    });

    /*-------------------------------------
    Slick Slider Init
    -------------------------------------*/
    $('.slick-slider').slick({
        prevArrow: '.slick-prev',
        nextArrow: '.slick-next'
    });

})(jQuery);