import * as SQLite from "expo-sqlite";

function GetMyDatabase() {
  const database = SQLite.openDatabase("SQLListExampl.db");
  return database;
}

export const db = GetMyDatabase();
