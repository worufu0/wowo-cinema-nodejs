'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cinemas', [
            {
                name: 'Wowo Cần Thơ',
                unsignedName: 'wowo-can-tho',
                address:
                    'Big C, Lô số 1, KDC Hưng Phú 1, P. Hưng Phú, Q. Cái Răng, Tp. Cần Thơ',
                map: '!1m18!1m12!1m3!1d7858.0609008832525!2d105.78012853488771!3d10.014343400000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a06296ffffffff%3A0x539b9427d4ca6904!2zTG90dGVyaWEgQmlnIEMgQ-G6p24gVGjGoQ!5e0!3m2!1svi!2s!4v1622169304796!5m2!1svi!2s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Hồ Chí Minh',
                unsignedName: 'wowo-ho-chi-minh',
                address:
                    'Tầng 5, TTTM Nowzone, 235 Nguyễn Văn Cừ, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh',
                map: '!1m18!1m12!1m3!1d3919.6285220040486!2d106.68048301433664!3d10.763086112384029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1ecbb495ff%3A0xe2c56085561d789a!2zMjM1IE5ndXnhu4VuIFbEg24gQ-G7qw!5e0!3m2!1svi!2s!4v1622168953282!5m2!1svi!2s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Vũng Tàu',
                unsignedName: 'wowo-vung-tau',
                address: 'Tầng 3 Lotte Mart Vũng Tàu, Đường 3/2, Tp. Vũng Tàu',
                map: '!1m18!1m12!1m3!1d3924.8968737430196!2d107.09058651433395!3d10.350130469748555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756fe6c1d51c6f%3A0x243e26ac0b8cddee!2zTE9UVEUgTWFydCBWxaluZyBUw6B1!5e0!3m2!1svi!2s!4v1622168979132!5m2!1svi!2s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Đà Nẵng',
                unsignedName: 'wowo-da-nang',
                address:
                    'Tầng 5 Lotte Mart Đà Nẵng, P. Hòa Cường Bắc, Q. Hải Châu, Tp. Đà Nẵng',
                map: '!1m18!1m12!1m3!1d3834.590151170732!2d108.22694461438492!3d16.03483694461891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219e42bd859f1%3A0x59203ba8579a98a5!2zTG90dGUgTWFydCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1622169000880!5m2!1svi!2s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Khánh Hòa',
                unsignedName: 'wowo-khanh-hoa',
                address:
                    'Tầng 5 Maximark, 60 Thái Nguyên, P. Phương Sài, Tp. Nha Trang',
                map: '!1m18!1m12!1m3!1d3899.0067025325925!2d109.18463373596035!3d12.247825152671028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d7fc0183ff7%3A0x599a80f822b260d0!2sLotte%20Cinema%20Nha%20Trang%20Th%C3%A1i%20Nguy%C3%AAn!5e0!3m2!1svi!2s!4v1622169079505!5m2!1svi!2s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Hà Nội',
                unsignedName: 'wowo-ha-noi',
                address: '344 Kim Ngưu, Minh Khai, Hai Bà Trưng, Hà Nội',
                map: '!<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8873048701416!2d105.85994518879795!3d20.997154078406332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad6ffd51e795%3A0x2aa0d7bd5bec8af9!2sLotte%20Cinema%20Minh%20Khai!5e0!3m2!1svi!2s!4v1622170598023!5m2!1svi!2s',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Cinemas', null, {});
    },
};
