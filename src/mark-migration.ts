import AppDataSource from './config/typeorm.config';

async function markMigrationAsRun() {
  try {
    await AppDataSource.initialize();

    // Insert the migration record to mark it as completed
    await AppDataSource.query(
      `INSERT INTO migrations (timestamp, name) VALUES (1763459280128, 'InitialMigration1763459280128')`,
    );

    console.log('Migration marked as completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

markMigrationAsRun();
