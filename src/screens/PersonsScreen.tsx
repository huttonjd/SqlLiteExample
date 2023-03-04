import { useEffect, useState } from "react";
import { IPerson, addPerson, searchAPerson, searchPerson, createTable, deletePerson, editPerson, deleteAllPersons } from "../database/Persons"
import { StyleSheet, Text, View } from 'react-native';

export default function PersonsScreen() {
  const [Persons, setPersons] = useState<IPerson[]>([]);
  const [localPerson, setPerson] = useState<IPerson>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("screens:PersonScreen:useEffect: START");
    createTable();
    //DeleteAllOfThePersons();

    //InitalizePersonTableIfNot();
    showPersons();

    setIsLoading(false);
    console.log("screens:PersonScreen:useEffect: END");
  }, []);

  if (isLoading) {
    return (
      <View >
        <Text>Loading Persons...</Text>
      
      </View>
    );
  } else{
    
  }

  async function InitalizePersonTableIfNot(){
    let rtnPersons = await searchPerson(); 
    if( rtnPersons.length == 0){
      AddaPerson({
        first: "John",
        last: "Doe",
        position: "President",
      });
      AddaPerson({
          first: "Jane",
          last: "Doe",
          position: "Vice-President",
      });
      AddaPerson({
          first: "Jim",
          last: "Boy",
          position: "IT Guy"
      });
    }
    console.log(rtnPersons);
  }

  async function DeleteAllOfThePersons() {
    console.log("screens:PersonScreen:DeleteAllOfThePersons: START");
    console.log(await deleteAllPersons());    
    console.log("screens:PersonScreen:DeleteAllOfThePersons: END");
  }

  async function AddaPerson(personData) {
    console.log(await addPerson(personData));
    setPerson(personData);
  }

  async function showAPerson(id) {
    console.log(await searchAPerson(id));
  }

  async function showPersons() {
    let rtnPersons = await searchPerson(); 
    console.log(rtnPersons);
    //console.log(await searchPerson());
    setPersons(rtnPersons);
  }

  async function modifyPerson(personData) {
    console.log(await editPerson(personData));
  }

  async function deleteAPerson(id) {
    console.log(await deletePerson(id));
  }

  function showPersonsOnScreen() {
    console.log("screens:Person:showNames: # of Persons: " + Persons.length);
    
    return Persons.map((Persons, index) => {
      return (
        <View key={index}>
          <Text>{Persons.first} | {Persons.last} | {Persons.position}</Text>
        </View>
      );
    });
  };


  return (
    <View  style={styles.container}>
      <Text>Persons</Text>
      {showPersonsOnScreen()}
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