import { DataSource } from 'typeorm';
import { TagEntity } from '../tags/tag.entity';
import { User } from '../user/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'mypassword123',
  database: 'postgres',
  entities: [TagEntity, User],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
