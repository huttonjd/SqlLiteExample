import { db } from "./SQLite";

export interface IPerson  {
  first: string;
  last: string;
  position: string;
}

export function createTable() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Person " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, first TEXT, last TEXT, position TEXT);"
    );
  });
}

export async function addPerson(personData) {
  const { first, last, position } = personData;

  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Person (first, last, position) VALUES (?, ?, ?);",
        [first, last, position],
        () => {
          resolve("Person Added!");
        }
      );
    });
  });
}

export async function searchPerson() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Person;",
        [],
        (transaction, result) => {
          resolve(result.rows._array);
        }
      );
    });
  });
}

export async function searchAPerson(idpersonData) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Person WHERE id=?;",
        [idpersonData],
        (transaction, result) => {
          resolve(result.rows._array);
        }
      );
    });
  });
}

export async function editPerson(personData) {
  const { first, last, text, id } = personData;

  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Person SET first=?, last=?, position=? WHERE id=?;",
        [first, last, position, id],
        () => {
          resolve("Person updated with success!");
        }
      );
    });
  });
}

export async function deletePerson(idpersonData) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Person WHERE id=?;", [idpersonData], () => {
        resolve("Deleted Person!");
      });
    });
  });
}

export async function deleteAllPersons() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Person;", [], () => {
        resolve("All Persons Deleted!");
      });
    });
  });
}

