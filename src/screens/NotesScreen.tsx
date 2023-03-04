import { useEffect, useState } from "react";
import { INote, addNote, searchANote, searchNote, createTable, deleteNote, editNote, deleteAllNotes } from "../database/Notes"
import { StyleSheet, Text, View } from 'react-native';

export default function NotesScreen() {
  const [notes, setNotes] =  useState<INote[]>([]);
  const [localNote, setNote] = useState<INote>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("screens:NoteScreen:useEffect: START");
    createTable();
    //DeleteAllOfTheNotes();
    
    //InitalizeNoteTableIfNot();
    
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

  async function InitalizeNoteTableIfNot(){
    let rtnNotes = await searchNote(); 
    if( rtnNotes.length == 0){
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
    }
    console.log(rtnNotes);
  }


  async function DeleteAllOfTheNotes() {
    console.log("screens:NoteScreen:DeleteAllOfTheNotes: START");
    console.log(await deleteAllNotes());    
    console.log("screens:NoteScreen:DeleteAllOfTheNotes: END");
  }

  async function AddaNote(noteData) {
    console.log(await addNote(noteData));
    setNote(noteData);
  }

  async function showANote(id) {
    console.log(await searchANote(id));
  }

  async function showNotes() {
    let rtnNotes = await searchNote(); 
    console.log(rtnNotes);
    //console.log(await searchNote());
    setNotes(rtnNotes);
  }

  async function modifyNote(noteData) {
    console.log(await editNote(noteData));
  }

  async function deleteANote(id) {
    console.log(await deleteNote(id));
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
      <Text>Notes</Text>
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