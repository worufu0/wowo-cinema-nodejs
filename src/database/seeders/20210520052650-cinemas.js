'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Cinemas', [
            {
                name: 'Wowo Cần Thơ',
                unsignedName: 'wowo-can-tho',
                address:
                    'Big C, Lô số 1, KDC Hưng Phú 1, P. Hưng Phú, Q. Cái Răng, Tp. Cần Thơ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Hồ Chí Minh',
                unsignedName: 'wowo-ho-chi-minh',
                address:
                    'Tầng 5, TTTM Nowzone, 235 Nguyễn Văn Cừ, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Vũng Tàu',
                unsignedName: 'wowo-vung-tau',
                address: 'Tầng 3 Lotte Mart Vũng Tàu, Đường 3/2, Tp. Vũng Tàu',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Đà Nẵng',
                unsignedName: 'wowo-da-nang',
                address:
                    'Tầng 5 Lotte Mart Đà Nẵng, P. Hòa Cường Bắc, Q. Hải Châu, Tp. Đà Nẵng',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Khánh Hòa',
                unsignedName: 'wowo-khanh-hoa',
                address:
                    'Tầng 5 Maximark, 60 Thái Nguyên, P. Phương Sài, Tp. Nha Trang',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Hà Nội',
                unsignedName: 'wowo-ha-noi',
                address: '344 Kim Ngưu, Minh Khai, Hai Bà Trưng, Hà Nội',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Cinemas', null, {});
    },
};
