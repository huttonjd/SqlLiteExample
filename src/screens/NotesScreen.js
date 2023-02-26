import { useEffect, useState } from "react";
import { addNote, searchANote, searchNote, createTable, deleteNote, editNote, deleteAllNotes } from "../database/Notes"
import { StyleSheet, Text, View } from 'react-native';

export default function NotesScreen() {
  const [notes, setNotes] = useState([{
    title: '',
    category: '',
    text: ''
  }]);
  const [note, setNote] = useState({
    title: '',
    category: '',
    text: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("screens:NoteScreen:useEffect: START");
    createTable();
    DeleteAllOfTheNotes();
    
    AddaNote({
      title: "JavaScript",
      category: "Coding Language",
      text: "Yeh Javascript.",
    });
    AddaNote({
      title: "ReactNative",
      category: "Coding Environemnt",
      text: "Yeh ReactNative.",
    });
    AddaNote({
      title: "Pay electricity bill",
      category: "Financial",
      text: "don't delay."
    });
    showNotes();
    //showANote(1);
    //excludeNote(1);
    showNotes();

    setIsLoading(false);
    console.log("screens:NoteScreen:useEffect: END");
  }, []);

  if (isLoading) {
    return (
      <View >
        <Text>Loading notes...</Text>
      
      </View>
    );
  } else{
    
  }


  async function DeleteAllOfTheNotes() {
    console.log("screens:NoteScreen:DeleteAllOfTheNotes: START");
    console.log(await deleteAllNotes());    
    console.log("screens:NoteScreen:DeleteAllOfTheNotes: END");
  }
  async function AddaNote(nota) {
    console.log(await addNote(nota));
    setNote(nota);
  }

  async function showANote(idNota) {
    console.log(await searchANote(idNota));
  }

  async function showNotes() {
    let rtnNotes = await searchNote(); 
    console.log(rtnNotes);
    //console.log(await searchNote());
    setNotes(rtnNotes);
  }

  async function modifyNote(nota) {
    console.log(await editNote(nota));
  }

  async function excludeNote(idNota) {
    console.log(await deleteNote(idNota));
  }

  function showNotesOnScreen() {
    console.log("screens:Note:showNames: # of notes: " + notes.length);
    
    return notes.map((notes, index) => {
      return (
        <View key={index}>
          <Text>{notes.title} | {notes.category} | {notes.text}</Text>
        </View>
      );
    });
  };


  return (
    <View  style={styles.container}>
      {showNotesOnScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});