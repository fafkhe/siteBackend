import { DataSource } from "typeorm";
import { Project } from "./project/entities/project.entity";
import { config } from "process";


// export default new DataSource({
//       type: 'postgres', // or 'mysql', 'sqlite', etc.
//       host: 'localhost',
//       port: 5432,
//       username: 'your_username',
//       password: 'your_password',
//       database: 'your_database',
//       entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Path to your entities
//       migrations: [__dirname + '/migrations/**/*{.ts,.js}'], // Path to your migrations
//       synchronize: false, // Set to true for development, false for production
// });




const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin!@#$%",
  database: "site",
  entities: [
    __dirname + "/project/entities/*.entity{.ts,.js}", 
    __dirname + "/user/entities/*.entity{.ts,.js}"
  ],
  migrations: [
    __dirname + "/migrations/**/*{.ts,.js}",
    __dirname + "/user/migrations/**/*{.ts,.js}" 
  ],
  synchronize: true,
  logging: false,
});



export default AppDataSource ;