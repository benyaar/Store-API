import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(
    'online-store',
    'postgres',
    `root`,
    {
        dialect: 'postgres',
        host: `localhost`,
    });
