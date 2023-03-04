import * as SQLite from "expo-sqlite";

function GetMyDatabase() {
  const database = SQLite.openDatabase("SQLListExample.db");
  return database;
}

export const db = GetMyDatabase();
