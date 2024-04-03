import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite', // ? database type
    database: 'db.sqlite', // database name
    entities: ['dist/**/*.entity.js'],
    migrations : ['dist/db/migrations/*.js']
    // synchronize : true,
    // username : 'username', // ? if mysql need
    // password : 'password' // ? if mysql need
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;