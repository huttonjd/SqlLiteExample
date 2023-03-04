import { useEffect, useState } from "react";
import { INote, addNote, getAllNotes, getNote, createTable, deleteNote, editNote, deleteAllNotes } from "../database/Notes"
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

export default function NotesScreen() {
  const [notes, setNotes] =  useState<INote[]>([]);
  const [localNote, setNote] = useState<INote>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("screens:NoteScreen:useEffect: START");
    createTable();
    //DeleteAllOfTheNotes();
    
    InitalizeNoteTable();
    
    retrieveNotes();
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

  async function InitalizeNoteTable(){
    let rtnNotes = await getAllNotes(); 
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

  async function AddAllNotes(){
    await InitalizeNoteTable();
    await retrieveNotes();
  }


  async function AddaNote(noteData) {
    console.log(await addNote(noteData));
    setNote(noteData);
  }

  async function retrieveNotes() {
    let rtnNotes = await getAllNotes(); 
    console.log(rtnNotes);
    //console.log(await getAllNotes());
    setNotes(rtnNotes);
  }

  async function modifyNote(noteData) {
    console.log(await editNote(noteData));
  }

  async function deleteANote(id) {
    console.log(await deleteNote(id));

  }

  async function DeleteAllOfTheNotes() {
    console.log("screens:NoteScreen:DeleteAllOfTheNotes: START");
    console.log(await deleteAllNotes());    
    setNotes([]);
    retrieveNotes();
    console.log("screens:NoteScreen:DeleteAllOfTheNotes: END");
  }


  function showNotesOnScreen() {
    console.log("screens:Note:retrieveNames: # of notes: " + notes.length);
    
    return notes.map((notes, index) => {
      return (
        <View key={index}>
          <Text style={styles.data}>{notes.title} | {notes.category} | {notes.text}</Text>
        </View>
      );
    });
  };

  const Separator = () => <View style={styles.separator} />;
  const Space = () => <View style={styles.space} />;

  return (
    <SafeAreaView style={styles.container}>
      <View >
        
        <Text style={styles.title}>Notes</Text>
        
        {showNotesOnScreen()}

        <Separator />

        <Space />

        <Button
            disabled={notes.length == 0}
            onPress={DeleteAllOfTheNotes}
            title="Delete All Notes"
            color="#841584"
            accessibilityLabel="Delete All Notes and refresh"
          />
        
        <Space />
        
        <Button
            disabled={notes.length > 0}
            onPress={AddAllNotes}
            title="Add All Notes "
            color="#4267B2"
            accessibilityLabel="Add Notes and refresh"
          />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },  
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 8,
  },
  data: {
    textAlign: 'center',
    
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  space: {
    marginVertical: 8,
  },
});
