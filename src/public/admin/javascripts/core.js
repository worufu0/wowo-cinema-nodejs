/*
--------------------------------------------------------------
  Template Name: Soyuz - Responsive Admin Dashboard Template
  File: Core JS File
--------------------------------------------------------------
 */
'use strict';
$(document).ready(function () {
    /* -- Menu js -- */
    $.sidebarMenu($('.vertical-menu'));
    $(function () {
        for (
            var a = window.location,
                abc = $('.vertical-menu a')
                    .filter(function () {
                        return a.href.includes(this.href);
                    })
                    .addClass('active')
                    .parent()
                    .addClass('active');
            ;

        ) {
            if (!abc.is('li')) break;
            abc = abc.parent().addClass('in').parent().addClass('active');
        }
    });
    // Stastical
    $('#inputStasType').on('change', function () {
        $.ajax({
            url: `/admin/stastical/change-type`,
            method: 'GET',
            data: { type: $(this).val() },
            success: function (res) {
                let result = res.reduce(
                    (total, curr) =>
                        (total += `<option value="${curr.id}">${curr.name}</option>`),
                    ''
                );

                $('#inputStasObj').html(result);
            },
        });
    });
    // Stastical
    var today = new Date();
    today.setDate(today.getDate() + 1);
    var oneMonthAgo = new Date(today);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    $('#inputDateFrom').val(
        oneMonthAgo.getFullYear() +
            '-' +
            ('0' + (oneMonthAgo.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + oneMonthAgo.getDate()).slice(-2)
    );
    $('#inputDateTo').val(
        today.getFullYear() +
            '-' +
            ('0' + (today.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + today.getDate()).slice(-2)
    );
    function refreshChart() {
        $.ajax({
            url: 'http://localhost:3000/admin/stastical/refresh',
            data: {
                type: $('#inputStasType').val(),
                obj: $('#inputStasObj').val(),
                from: $('#inputDateFrom').val(),
                to: $('#inputDateTo').val(),
            },
            success: function (res) {
                $('#text').html(
                    `<p class="m-10"><b>${res.objName}</b> bán được <b>${
                        res.dataTotal.amount
                    } vé</b> với doanh thu
                        <b>${(res.dataTotal.revenue * 1000).toLocaleString(
                            'vi',
                            {
                                style: 'currency',
                                currency: 'VND',
                            }
                        )}</b> từ ngày <b>${res.date.from}</b> đến <b>${
                        res.date.to
                    }</b>.
                    </p>`
                );

                var options = {
                    series: [
                        {
                            name: 'Doanh thu',
                            data: res.data.revenueSet,
                        },
                        {
                            name: 'Vé bán ra',
                            data: res.data.amountSet,
                        },
                    ],
                    chart: {
                        height: 350,
                        type: 'area',
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: res.range,
                    },
                    yaxis: [
                        {
                            title: {
                                text: 'Doanh thu',
                            },
                            labels: {
                                formatter: function (value) {
                                    return (value * 1000).toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                    });
                                },
                            },
                        },
                        {
                            opposite: true,
                            title: {
                                text: 'Vé bán ra',
                            },
                        },
                    ],
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy',
                        },
                    },
                };
                var apexChart = $('#apex-chart');
                var chart = new ApexCharts(
                    document.querySelector('#apex-chart'),
                    options
                );
                apexChart.html('');
                chart.render();
            },
        });
    }
    if (window.location.pathname === '/admin/') {
        refreshChart();
    }
    $('#stasticalForm').on('submit', function (e) {
        e.preventDefault();
        refreshChart();
    });
    //Input mask
    $('#inputName.cinemaInput').inputmask({
        mask: 'Wowo *{*}',
        definitions: {
            '*': {
                validator:
                    '[a-z0-9A-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]',
            },
        },
    });
    $('#inputUnsignedName').inputmask({
        mask: '/movie/*{*}',
        definitions: {
            '*': {
                validator: '[0-9a-z-]',
            },
        },
    });
    $('#inputUnsignedName2').inputmask({
        mask: '/cinem\\a/wowo-*{*}',
        definitions: {
            '*': {
                validator: '[0-9a-z-]',
            },
        },
    });
    $('#inputVideo').inputmask({
        mask: 'https://www.youtube.com/w\\atch?v=*{11}',
        definitions: {
            '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
            },
        },
    });
    /* -- Preview image -- */
    function previewSingle(input, previewId) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(previewId).attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    function previewMulti(input, previewId) {
        if (input.files) {
            $(previewId).html('');

            for (var i = 0; i < input.files.length; i++) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var div1 = $($.parseHTML('<div>')).addClass('col-lg-3');
                    var div2 = $($.parseHTML('<div>')).addClass(
                        'form-group',
                        ' mb-10'
                    );

                    $($.parseHTML('<img>'))
                        .css('width', '100%')
                        .attr('src', e.target.result)
                        .appendTo(div2);
                    div2.appendTo(div1);
                    div1.appendTo($(previewId));
                };

                reader.readAsDataURL(input.files[i]);
            }
        }
    }
    // Confirm submit
    $('.addBtn').on('click', function (e) {
        var form = $('.addForm');
        $.confirm({
            title: 'Xác nhận',
            content: `Bạn có chắc muốn thêm mới ?`,
            buttons: {
                confirm: {
                    text: 'Có',
                    btnClass: 'btn-blue',
                    action: function () {
                        form.submit();
                    },
                },
                cancel: { text: 'Không' },
            },
        });
        e.preventDefault();
    });
    $('.deleteBtn').on('click', function (e) {
        var form = $(this).parent('form');
        $.confirm({
            title: 'Xác nhận',
            content: `Bạn có chắc muốn xóa ?`,
            buttons: {
                confirm: {
                    text: 'Có',
                    btnClass: 'btn-blue',
                    action: function () {
                        form.submit();
                    },
                },
                cancel: { text: 'Không' },
            },
        });
        e.preventDefault();
    });
    // Action response
    if ($('#action-res').data('value') === 'add') {
        $.alert({
            title: 'Thông báo',
            content: `Thêm mới thành công !`,
        });
    }
    if ($('#action-res').data('value') === 'delete') {
        $.alert({
            title: 'Thông báo',
            content: `Xóa thành công !`,
        });
    }
    $('#inputPoster').on('change', function (e) {
        previewSingle(this, '#previewPoster');
    });
    $('#inputBanner').on('change', function (e) {
        previewSingle(this, '#previewBanner');
    });
    $('#inputImages').on('change', function (e) {
        previewMulti(this, '#previewImages');
    });
    /* -- Infobar Setting Sidebar -- */
    $('#infobar-settings-open').on('click', function (e) {
        e.preventDefault();
        $('.infobar-settings-sidebar-overlay').css({
            background: 'rgba(0,0,0,0.4)',
            position: 'fixed',
        });
        $('#infobar-settings-sidebar').addClass('sidebarshow');
    });
    $('#infobar-settings-close').on('click', function (e) {
        e.preventDefault();
        $('.infobar-settings-sidebar-overlay').css({
            background: 'transparent',
            position: 'initial',
        });
        $('#infobar-settings-sidebar').removeClass('sidebarshow');
    });
    /* -- Menu Hamburger -- */
    $('.menu-hamburger').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('toggle-menu');
        $('.menu-hamburger img').toggle();
    });
    /* -- Menu Topbar Hamburger -- */
    $('.topbar-toggle-hamburger').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('topbar-toggle-menu');
        $('.topbar-toggle-hamburger img').toggle();
    });
    /* -- Media Size -- */
    function mediaSize() {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $('body').removeClass('toggle-menu');
            $('.menu-hamburger img.menu-hamburger-close').hide();
            $('.menu-hamburger img.menu-hamburger-collapse').show();
        }
    }
    mediaSize();
    window.addEventListener('resize', mediaSize, false);
    /* -- Switchery -- */
    var setting_first = document.querySelector('.js-switch-setting-first');
    var switchery = new Switchery(setting_first, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_second = document.querySelector('.js-switch-setting-second');
    var switchery = new Switchery(setting_second, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_third = document.querySelector('.js-switch-setting-third');
    var switchery = new Switchery(setting_third, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_fourth = document.querySelector('.js-switch-setting-fourth');
    var switchery = new Switchery(setting_fourth, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_fifth = document.querySelector('.js-switch-setting-fifth');
    var switchery = new Switchery(setting_fifth, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_sixth = document.querySelector('.js-switch-setting-sixth');
    var switchery = new Switchery(setting_sixth, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_seventh = document.querySelector('.js-switch-setting-seventh');
    var switchery = new Switchery(setting_seventh, {
        color: '#506fe4',
        size: 'small',
    });
    var setting_eightth = document.querySelector('.js-switch-setting-eightth');
    var switchery = new Switchery(setting_eightth, {
        color: '#506fe4',
        size: 'small',
    });
    /* -- Bootstrap Popover -- */
    $('[data-toggle="popover"]').popover();
    /* -- Bootstrap Tooltip -- */
    $('[data-toggle="tooltip"]').tooltip();
});
