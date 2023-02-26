import { db } from "./SQLite";

export function createTable() {
  db.transaction((transaction) => {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        "Note " +
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category TEXT, text TEXT);"
    );
  });
}

export async function addNote(nota) {
  const { title, category, text } = nota;

  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Note (title, category, text) VALUES (?, ?, ?);",
        [title, category, text],
        () => {
          resolve("Note Added!");
        }
      );
    });
  });
}

export async function searchNote() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Note;",
        [],
        (transaction, result) => {
          resolve(result.rows._array);
        }
      );
    });
  });
}

export async function searchANote(idNota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM Note WHERE id=?;",
        [idNota],
        (transaction, result) => {
          resolve(result.rows._array);
        }
      );
    });
  });
}

export async function editNote(nota) {
  const { title, category, text, id } = nota;

  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Note SET title=?, category=?, text=? WHERE id=?;",
        [title, category, text, id],
        () => {
          resolve("Note updated with success!");
        }
      );
    });
  });
}

export async function deleteNote(idNota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Note WHERE id=?;", [idNota], () => {
        resolve("Deleted note!");
      });
    });
  });
}

export async function deleteAllNotes() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Note;", [], () => {
        resolve("All notes Deleted!");
      });
    });
  });
}

