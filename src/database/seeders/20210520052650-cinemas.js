'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Cinemas', [
            {
                name: 'Wowo Cần Thơ',
                unsignedName: 'wowo-can-tho',
                address: '33 Lý Thánh Tôn, Cần Thơ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Hồ Chí Minh',
                unsignedName: 'wowo-ho-chi-minh',
                address: '376 / 24 Nguyễn Đình Chiểu. Quận 3, Hồ Chí Minh',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Vũng Tàu',
                unsignedName: 'wowo-vung-tau',
                address: '80-82 Binh Gia-F8, Vũng Tàu',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Đà Nẵng',
                unsignedName: 'wowo-da-nang',
                address: '45 - 47 Thống Nhất, Đà Nẵng',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Nha Trang',
                unsignedName: 'wowo-nha-trang',
                address: '16 23 - 10, Nha Trang',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Wowo Hà Nội',
                unsignedName: 'wowo-ha-noi',
                address: '367 Minh Khai, Quận Hai Bà Trưng, Hà Nội',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Cinemas', null, {});
    },
};
