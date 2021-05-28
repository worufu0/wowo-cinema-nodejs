(function ($) {
    'user strict';
    // Preloader Js
    $(window).on('load', function () {
        $('.preloader').fadeOut(1000);
        let img = $('.bg_img');
        img.css('background-image', function () {
            let bg = 'url(' + $(this).data('background') + ')';
            return bg;
        });
        // filter functions
        let $grid = $('.grid-area');
        let filterFns = {};
        $grid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: 0,
            },
        });
        // bind filter button click
        $('ul.filter').on('click', 'li', function () {
            let filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue,
            });
        });
        // change is-checked class on buttons
        $('ul.filter').each(function (i, buttonGroup) {
            let $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'li', function () {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
        // Nice Select
        $('.select-bar').niceSelect();
        // Lightcase
        $('.video-popup').magnificPopup({
            type: 'iframe',
        });
        $('body').each(function () {
            $(this)
                .find('.img-pop')
                .magnificPopup({
                    type: 'image',
                    gallery: {
                        enabled: true,
                    },
                });
        });
        // Wow js active
        new WOW().init();
        //Faq
        $('.faq-wrapper .faq-title').on('click', function (e) {
            let element = $(this).parent('.faq-item');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('.faq-content').removeClass('open');
                element.find('.faq-content').slideUp(300, 'swing');
            } else {
                element.addClass('open');
                element.children('.faq-content').slideDown(300, 'swing');
                element
                    .siblings('.faq-item')
                    .children('.faq-content')
                    .slideUp(300, 'swing');
                element.siblings('.faq-item').removeClass('open');
                element
                    .siblings('.faq-item')
                    .find('.faq-title, .faq-title-two')
                    .removeClass('open');
                element
                    .siblings('.faq-item')
                    .find('.faq-content')
                    .slideUp(300, 'swing');
            }
        });
        //MenuBar
        $('.header-bar').on('click', function () {
            $('.menu').toggleClass('active');
            $('.header-bar').toggleClass('active');
            $('.overlay').toggleClass('active');
        });
        $('.overlay').on('click', function () {
            $('.menu').removeClass('active');
            $('.header-bar').removeClass('active');
            $('.overlay').removeClass('active');
        });
        //Menu Dropdown Icon Adding
        $('ul>li>.submenu').parent('li').addClass('menu-item-has-children');
        // drop down menu width overflow problem fix
        $('ul')
            .parent('li')
            .hover(function () {
                let menu = $(this).find('ul');
                let menupos = $(menu).offset;
                if (menupos.left + menu.width() > $(window).width()) {
                    let newpos = -$(menu).width();
                    menu.css({
                        left: newpos,
                    });
                }
            });
        $('.menu li a').on('click', function (e) {
            let element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(300, 'swing');
            } else {
                element.addClass('open');
                element.children('ul').slideDown(300, 'swing');
                element.siblings('li').children('ul').slideUp(300, 'swing');
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(300, 'swing');
            }
        });
        // Scroll To Top
        let scrollTop = $('.scrollToTop');
        $(window).on('scroll', function () {
            if ($(this).scrollTop() < 500) {
                scrollTop.removeClass('active');
            } else {
                scrollTop.addClass('active');
            }
        });
        //Click event to scroll to top
        $('.scrollToTop').on('click', function () {
            $('html, body').animate(
                {
                    scrollTop: 0,
                },
                500
            );
            return false;
        });
        // Header Sticky Here
        let headerOne = $('.header-section');
        $(window).on('scroll', function () {
            if ($(this).scrollTop() < 1) {
                headerOne.removeClass('header-active');
            } else {
                headerOne.addClass('header-active');
            }
        });
        $('.window-warning .lay').on('click', function () {
            $('.window-warning').addClass('inActive');
        });
        $('.seat-plan-wrapper li .movie-schedule .item').on(
            'click',
            function () {
                $('.window-warning').removeClass('inActive');
            }
        );
        //Tab Section
        $('.tab ul.tab-menu li').on('click', function (g) {
            let tab = $(this).closest('.tab'),
                index = $(this).closest('li').index();
            tab.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            tab.find('.tab-area')
                .find('div.tab-item')
                .not('div.tab-item:eq(' + index + ')')
                .fadeOut(500);
            tab.find('.tab-area')
                .find('div.tab-item:eq(' + index + ')')
                .fadeIn(500);
            g.preventDefault();
        });
        $('.search-tab ul.tab-menu li').on('click', function (k) {
            let search_tab = $(this).closest('.search-tab'),
                searchIndex = $(this).closest('li').index();
            search_tab.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            search_tab
                .find('.tab-area')
                .find('div.tab-item')
                .not('div.tab-item:eq(' + searchIndex + ')')
                .hide(10);
            search_tab
                .find('.tab-area')
                .find('div.tab-item:eq(' + searchIndex + ')')
                .show(10);
            k.preventDefault();
        });
        $('.tabTwo ul.tab-menu li').on('click', function (g) {
            let tabTwo = $(this).closest('.tabTwo'),
                index = $(this).closest('li').index();
            tabTwo.find('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            tabTwo
                .find('.tab-area')
                .find('div.tab-item')
                .not('div.tab-item:eq(' + index + ')')
                .fadeOut(10);
            tabTwo
                .find('.tab-area')
                .find('div.tab-item:eq(' + index + ')')
                .fadeIn(10);
            g.preventDefault();
        });
        //Odometer
        $('.counter-item').each(function () {
            $(this).isInViewport(function (status) {
                if (status === 'entered') {
                    for (
                        let i = 0;
                        i < document.querySelectorAll('.odometer').length;
                        i++
                    ) {
                        let el = document.querySelectorAll('.odometer')[i];
                        el.innerHTML = el.getAttribute('data-odometer-final');
                    }
                }
            });
        });
        $('.social-icons li a').on('mouseover', function (e) {
            let social = $(this).parent('li');
            if (social.children('a').hasClass('active')) {
                social.siblings('li').children('a').removeClass('active');
                $(this).addClass('active');
            } else {
                social.siblings('li').children('a').removeClass('active');
                $(this).addClass('active');
            }
        });

        let book = 0;
        $('.seat-free img').on('click', function (e) {
            if (book == 0) {
                $(this).attr('src', './assets/images/movie/seat01-free.png');
                book = 1;
            } else if (book == 1) {
                $(this).attr('src', './assets/images/movie/seat01-booked.png');
                book = 0;
            }
        });
        let bookTwo = 1;
        $('.seat-free-two img').on('click', function (e) {
            if (bookTwo == 0) {
                $(this).attr('src', './assets/images/movie/seat02-free.png');
                bookTwo = 1;
            } else if (bookTwo == 1) {
                $(this).attr('src', './assets/images/movie/seat02-booked.png');
                bookTwo = 0;
            }
        });
        // shop cart + - start here
        let CartPlusMinus = $('.cart-plus-minus');
        CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
        CartPlusMinus.append('<div class="inc qtybutton">+</div>');
        $('.qtybutton').on('click', function () {
            let $button = $(this);
            let oldValue = $button.parent().find('input').val();
            if ($button.text() === '+') {
                let newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    let newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find('input').val(newVal);
        });
        $('.tab-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
            },
        });
        $('.sponsor-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 1500,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                500: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                },
                1200: {
                    items: 5,
                },
            },
        });
        $('.casting-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 100,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                450: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
            },
        });
        let owl = $('.casting-slider');
        owl.owlCarousel();
        // Go to the next item
        $('.cast-next').on('click', function () {
            owl.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $('.cast-prev').on('click', function () {
            owl.trigger('prev.owl.carousel', [300]);
        });
        $('.casting-slider-two').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 100,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                450: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
            },
        });
        let owlTT = $('.casting-slider-two');
        owlTT.owlCarousel();
        // Go to the next item
        $('.cast-next-2').on('click', function () {
            owlTT.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $('.cast-prev-2').on('click', function () {
            owlTT.trigger('prev.owl.carousel', [300]);
        });
        $('.details-photos').owlCarousel({
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            margin: 20,
            nav: false,
            loop: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                1024: {
                    items: 3,
                },
                1200: {
                    items: 3,
                },
            },
        });
        //Speaker Slider
        $('.speaker-slider').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dots: false,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                },
            },
        });
        let owlT = $('.speaker-slider');
        owlT.owlCarousel();
        // Go to the next item
        $('.speaker-next').on('click', function () {
            owlT.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $('.speaker-prev').on('click', function () {
            owlT.trigger('prev.owl.carousel', [300]);
        });
        //Client SLider
        $('.client-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
        });
        //Count Down JAva Script
        $('.countdown').countdown(
            {
                date: '10/15/2022 05:00:00',
                offset: +2,
                day: 'Day',
                days: 'Days',
            },
            function () {
                alert('Done!');
            }
        );
        //Widget Slider
        $('.widget-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
            margin: 30,
        });
        let owlBela = $('.widget-slider');
        owlBela.owlCarousel();
        // Go to the next item
        $('.widget-next').on('click', function () {
            owlBela.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $('.widget-prev').on('click', function () {
            owlBela.trigger('prev.owl.carousel', [300]);
        });
        $('.blog-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 2500,
            autoplayHoverPause: true,
        });
        let owlB = $('.blog-slider');
        owlB.owlCarousel();
        // Go to the next item
        $('.blog-next').on('click', function () {
            owlB.trigger('next.owl.carousel');
        });
        // Go to the previous item
        $('.blog-prev').on('click', function () {
            owlB.trigger('prev.owl.carousel', [300]);
        });
        // Active nav header
        $(
            `.menu .nav-header[data-value='${
                window.location.pathname.split('/')[1]
            }']`
        ).addClass('active');
        // Validate register form
        $('#register-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    minlength: 3,
                    maxlength: 320,
                },
                pass1: {
                    required: true,
                    minlength: 6,
                    maxlength: 32,
                },
                pass2: {
                    required: true,
                    equalTo: '#pass1',
                    minlength: 6,
                    maxlength: 32,
                },
            },
            messages: {
                email: {
                    required: 'Địa chỉ email không được trống',
                    email: 'Địa chỉ email không hợp lệ',
                },
                pass1: {
                    required: 'Mật khẩu không được trống',
                    minlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                    maxlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                },
                pass2: {
                    required: 'Xác nhận mật khẩu không được trống',
                    equalTo: 'Xác nhận mật khẩu không chính xác',
                    minlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                    maxlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                },
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
        });
        // Validate login form
        $('#login-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    minlength: 3,
                    maxlength: 320,
                },
                pass: {
                    required: true,
                    minlength: 6,
                    maxlength: 32,
                },
            },
            messages: {
                email: {
                    required: 'Địa chỉ email không được trống',
                    email: 'Địa chỉ email không hợp lệ',
                },
                pass: {
                    required: 'Mật khẩu không được trống',
                    minlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                    maxlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                },
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
        });
        // Validate recovery form
        $('#recovery-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    minlength: 3,
                    maxlength: 320,
                },
            },
            messages: {
                email: {
                    required: 'Địa chỉ email không được trống',
                    email: 'Địa chỉ email không hợp lệ',
                },
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
        });
        // Validate reset form
        $('#reset-form').validate({
            rules: {
                pass1: {
                    required: true,
                    minlength: 6,
                    maxlength: 32,
                },
                pass2: {
                    required: true,
                    equalTo: '#pass1',
                    minlength: 6,
                    maxlength: 32,
                },
            },
            messages: {
                pass1: {
                    required: 'Mật khẩu không được trống',
                    minlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                    maxlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                },
                pass2: {
                    required: 'Xác nhận mật khẩu không được trống',
                    equalTo: 'Xác nhận mật khẩu không chính xác',
                    minlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                    maxlength: 'Mật khẩu phải có độ dài từ 6 đến 32 kí tự',
                },
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
        });
        // Ticket search form
        $('[data-toggle="tooltip"]').tooltip();
        $('#searchInput').on('focusin', function () {
            $.ajax({
                url: '/search/autocomplete',
                method: 'GET',
                success: function (res) {
                    $('#searchInput').autocomplete({
                        source: res,
                        select: function (event, ui) {
                            const cinema = $('.cinemas .option.selected').data(
                                'value'
                            );
                            location.href = `/movie/${ui.item.value}?cinema=${cinema}`;
                            return false;
                        },
                    });
                },
            });
        });
        // Change query cinema
        const queryCinema = new URLSearchParams(window.location.search).get(
            'cinema'
        );
        if (queryCinema) {
            $('.list .option.selected').removeClass('selected');
            $(`.list .option[data-value="${queryCinema}"]`).addClass(
                'selected'
            );
            $('.current').text($('.list .option.selected').text());
            $('.tab-item').removeClass('active');
            $('.tab-item.dynamic').addClass('active');
            $('.tab-menu li').removeClass('active');
            $('.tab-menu li.dynamic').addClass('active');
        }

        // Change query room
        const queryRoom = new URLSearchParams(window.location.search).get(
            'room'
        );
        $('.room-border').first().addClass('active');
        if (queryRoom) {
            $('.room-border').removeClass('active');
            $(`.room-border[data-value="${queryRoom}"]`).addClass('active');
            $('.tab-item').removeClass('active');
            $('.tab-item.dynamic').addClass('active');
            $('.tab-menu li').removeClass('active');
            $('.tab-menu li.dynamic').addClass('active');
        }
        // Change cinemas select
        $('.query-cinemas').on('change', function () {
            $.ajax({
                url: '/movie/change-cinema',
                method: 'GET',
                data: {
                    id: $('#movie-name').data('value'),
                    cinema: $('.list .option.selected').data('value'),
                },
                success: function (res) {
                    window.history.replaceState(
                        '',
                        '',
                        `${window.location.pathname}?cinema=${$(
                            '.list .option.selected'
                        ).data('value')}`
                    );

                    if (res) {
                        let roomPartElement = '';
                        let showTimePartElement = '';
                        let ShowTimesElement = '';
                        res.Rooms.forEach((room) => {
                            roomPartElement = `
                                <div class="movie-name">
                                    <div class="icons">
                                        <i class="fas fa-video"></i>
                                        <i>${room.RoomType.name}</i>
                                    </div>
                                    <a class="name">${room.name}</a>
                                </div>`;

                            let showTimeElement = '';
                            room.ShowTimes.forEach((showTime) => {
                                showTimeElement += `<div class="item">${showTime.time}</div>`;
                            });

                            showTimePartElement = `
                                <div class="movie-schedule">
                                    ${showTimeElement}
                                </div>`;

                            ShowTimesElement += `
                                <li>
                                    ${roomPartElement}
                                    ${showTimePartElement}
                                </li>`;
                        });

                        $('.showtimes').html(
                            `<ul class="seat-plan-wrapper bg-five">
                                ${ShowTimesElement}
                            </ul`
                        );
                    } else {
                        $('.showtimes').html(
                            '<p>hiện tại không có suất chiếu tại cụm rạp này.</p>'
                        );
                    }
                },
            });
        });
        // Change rooms select
        $('.room-border').on('click', function () {
            $('.room-border').removeClass('active');
            $(this).addClass('active');

            $.ajax({
                url: '/cinema/change-room',
                method: 'GET',
                data: {
                    id: $('#cinema-name').data('value'),
                    room: $('.room-border.active').data('value'),
                },
                success: function (res) {
                    window.history.replaceState(
                        '',
                        '',
                        `${window.location.pathname}?room=${$(
                            '.room-border.active'
                        ).data('value')}`
                    );

                    if (res.length !== 0) {
                        let moviePartElement = '';
                        let showTimePartElement = '';
                        let ShowTimesElement = '';
                        res.forEach((movie) => {
                            moviePartElement = `
                                <div class="movie-name long">
                                    <img class="mini-poster" src="/images/movie/poster/poster-${movie.image}.jpg" alt="mini-poster" />
                                    <a class="name">${movie.name}</a>
                                </div>`;

                            let showTimeElement = '';
                            movie.ShowTimes.forEach((showTime) => {
                                showTimeElement += `<div class="item">${showTime.time}</div>`;
                            });

                            showTimePartElement = `
                                <div class="movie-schedule short">
                                    ${showTimeElement}
                                </div>`;

                            ShowTimesElement += `
                                <li>
                                    ${moviePartElement}
                                    ${showTimePartElement}
                                </li>`;
                        });

                        $('.showtimes').html(
                            `<ul class="seat-plan-wrapper bg-five">
                                ${ShowTimesElement}
                            </ul`
                        );
                    } else {
                        $('.showtimes').html(
                            '<p>hiện tại không có suất chiếu tại rạp này.</p>'
                        );
                    }
                },
            });
        });
        $('.cinemas2').on('change', function () {
            $.ajax({
                url: '/search/select-room',
                method: 'GET',
                data: {
                    cinema: $('.cinemas2 .list .option.selected').data('value'),
                },
                success: function (res) {
                    let options = '',
                        lis = '';
                    res.forEach((room) => {
                        options += `<option value="${room.id}">${room.name}</option>`;
                        if (lis === '') {
                            lis += `<li data-value="${room.id}" class="option selected">${room.name}</li>`;
                        } else {
                            lis += `<li data-value="${room.id}" class="option">${room.name}</li>`;
                        }
                    });

                    $('#room-select2').html(options);
                    $('.nice-select.rooms2 ul').html(lis);
                    $('.nice-select.rooms2 span').html(res[0].name);
                },
            });
        });
        if (queryCinema) {
            $('.list .option.selected').removeClass('selected');
            $(`[data-value="${queryCinema}"]`).addClass('selected');
            $('.current').text($('.list .option.selected').text());
        }
        $('#searchInput').on('click', function () {
            $('#searchResponse').empty();
        });
    });
})(jQuery);
