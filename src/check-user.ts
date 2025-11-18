import AppDataSource from './config/typeorm.config';

async function checkUserTable() {
  try {
    await AppDataSource.initialize();

    // Check if user table exists
    const userTableExists = await AppDataSource.query(
      `SELECT EXISTS (
         SELECT FROM information_schema.tables 
         WHERE table_schema = 'public' 
         AND table_name = 'user'
       );`,
    );

    console.log('User table exists:', userTableExists[0].exists);

    if (userTableExists[0].exists) {
      const userColumns = await AppDataSource.query(
        `SELECT column_name, data_type, is_nullable 
         FROM information_schema.columns 
         WHERE table_name = 'user' 
         ORDER BY ordinal_position;`,
      );
      console.log('User table structure:', userColumns);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

checkUserTable();
