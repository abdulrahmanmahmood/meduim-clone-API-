import AppDataSource from './config/typeorm.config';

async function checkDatabase() {
  try {
    await AppDataSource.initialize();

    // Check if migrations table exists
    const migrationsExist = await AppDataSource.query(
      `SELECT EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_schema = 'public' 
         AND table_name = 'migrations'
       );`,
    );

    console.log('Migrations table exists:', migrationsExist[0].exists);

    if (migrationsExist[0].exists) {
      const migrations = await AppDataSource.query(
        'SELECT * FROM migrations ORDER BY id DESC;',
      );
      console.log('Current migrations:', migrations);
    }

    // Check if tags table exists
    const tagsExist = await AppDataSource.query(
      `SELECT EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_schema = 'public' 
         AND table_name = 'tags'
       );`,
    );

    console.log('Tags table exists:', tagsExist[0].exists);

    if (tagsExist[0].exists) {
      const columns = await AppDataSource.query(
        `SELECT column_name, data_type 
         FROM information_schema.columns 
         WHERE table_name = 'tags' 
         ORDER BY ordinal_position;`,
      );
      console.log('Tags table structure:', columns);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

checkDatabase();
