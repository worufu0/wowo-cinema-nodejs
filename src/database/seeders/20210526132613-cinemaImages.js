'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('CinemaImages', [
            {
                name: '2LWvAZ5h8bSzGVpv7AAovo',
                cinemaId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'GxynzKxoCP358pUZoU2sEV',
                cinemaId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'PwpPFSGVUtbtein6YgBk48',
                cinemaId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'RMXdxq3m4m4M6mAY7kkQMb',
                cinemaId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'TP722w2UgSf1uhVKzuscQa',
                cinemaId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'XbV2JUatVKSKPBq9crFi4s',
                cinemaId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('CinemaImages', null, {});
    },
};
