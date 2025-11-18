import AppDataSource from './config/typeorm.config';

async function revertLastMigration() {
  try {
    await AppDataSource.initialize();

    // First, let's see the current migrations
    const migrations = await AppDataSource.query(
      'SELECT * FROM migrations ORDER BY id DESC LIMIT 1;',
    );
    console.log('Last migration:', migrations[0]);

    // Remove the migration record
    await AppDataSource.query(
      `DELETE FROM migrations WHERE name = 'AddNumberColumnToTags1763461874057';`,
    );
    console.log('Migration record removed');

    // Drop the number column
    await AppDataSource.query('ALTER TABLE tags DROP COLUMN IF EXISTS number;');
    console.log('Number column dropped');

    // Verify the table structure
    const columns = await AppDataSource.query(
      `SELECT column_name, data_type 
       FROM information_schema.columns 
       WHERE table_name = 'tags' 
       ORDER BY ordinal_position;`,
    );
    console.log('Current table structure:', columns);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

revertLastMigration();
