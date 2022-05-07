import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import Entry from './types/Entry';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  //return openDatabase({ name: 'entry-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getEntries = async (db: SQLiteDatabase): Promise<Entry[]> => {
  try {
    const todoItems: Entry[] = [];
    const results = await db.executeSql(`SELECT rowid as id,title,time,allDay FROM ${tableName}`);
    // @ts-ignore
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveEntries = async (db: SQLiteDatabase, todoItems: Entry[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.title}', '${i.time}', '${i.allDay}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteEntry = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};