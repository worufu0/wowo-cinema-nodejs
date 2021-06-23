/*
--------------------------------
    : Custom - Validate js :
--------------------------------
*/
'use strict';
$(document).ready(function () {
    jQuery('.form-validate').validate({
        rules: {
            inputName: {
                required: true,
                maxlength: 128,
            },
            inputUnsignedName: {
                required: true,
                maxlength: 256,
            },
            inputUnsignedName2: {
                required: true,
                maxlength: 256,
            },
            inputCategory: {
                required: true,
                maxlength: 64,
            },
            inputCountry: {
                required: true,
                maxlength: 64,
            },
            inputDirector: {
                required: true,
                maxlength: 64,
            },
            inputTimeLong: {
                required: true,
                range: [1, 300],
            },
            inputOpeningDay: {
                required: true,
            },
            inputAddress: {
                required: true,
                maxlength: 128,
            },
            inputCinema: {
                required: true,
            },
            inputRoomType: {
                required: true,
            },
            inputMovie: {
                required: true,
            },
            inputRow: {
                required: true,
                range: [1, 20],
            },
            inputCol: {
                required: true,
                range: [1, 20],
            },
            inputTime: {
                required: true,
            },
            inputDate: {
                required: true,
            },
            inputPrice: {
                required: true,
                range: [1, 500],
            },
        },
        messages: {
            inputName: {
                required: 'Tên không được trống',
                maxlength: 'Tên không được vượt quá 128 kí tự',
            },
            inputUnsignedName: {
                required: 'Đường dẫn không được trống',
                maxlength: 'Tên không được vượt quá 256 kí tự',
            },
            inputUnsignedName2: {
                required: 'Đường dẫn không được trống',
                maxlength: 'Tên không được vượt quá 256 kí tự',
            },
            inputCategory: {
                required: 'Thể loại không được trống',
                maxlength: 'Tên không được vượt quá 64 kí tự',
            },
            inputCountry: {
                required: 'Quốc gia không được trống',
                maxlength: 'Tên không được vượt quá 64 kí tự',
            },
            inputDirector: {
                required: 'Đạo diễn không được trống',
                maxlength: 'Tên không được vượt quá 64 kí tự',
            },
            inputTimeLong: {
                required: 'Thời lượng không được trống',
                range: 'Thời lượng phim không vượt quá 300 phút',
            },
            inputOpeningDay: {
                required: 'Ngày công chiếu không được trống',
            },
            inputAddress: {
                required: 'Địa chỉ không được trống',
            },
            inputCinema: {
                required: 'Hãy chọn rạp phim',
            },
            inputRoomType: {
                required: 'Hãy chọn loại rạp',
            },
            inputMovie: {
                required: 'Hãy chọn phim',
            },
            inputRow: {
                required: 'Kích thước ngang không được trống',
                range: 'Kích thước ngang không vượt quá 20',
            },
            inputCol: {
                required: 'Kích thước dọc không được trống',
                range: 'Kích thước dọc không vượt quá 20',
            },
            inputTime: {
                required: 'Thời gian chiếu không được trống',
            },
            inputDate: {
                required: 'Ngày chiếu không được trống',
            },
            inputPrice: {
                required: 'Giá vé không được trống',
                range: 'Giá vé không vượt quá 500',
            },
        },
    });
});
