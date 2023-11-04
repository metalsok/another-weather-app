import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', '', {
  host: 'localhost',
  port:5432,
  dialect: 'postgres' // Change the dialect to 'postgres'
});

