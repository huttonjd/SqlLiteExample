import { useEffect, useState } from "react";
import { IPerson, addPerson, getAllPersons, getAPerson, createTable, deletePerson, editPerson, deleteAllPersons } from "../database/Persons"
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

export default function PersonsScreen() {
  const [Persons, setPersons] = useState<IPerson[]>([]);
  const [localPerson, setPerson] = useState<IPerson>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("screens:PersonScreen:useEffect: START");
    createTable();
    //DeleteAllOfThePersons();

    InitalizePersonTable();
    retrievePersons();

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

  async function InitalizePersonTable(){
    let rtnPersons = await getAllPersons(); 
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



  async function AddAllPerson(){
    await InitalizePersonTable();
    await retrievePersons();
  }


  async function AddaPerson(personData) {
    console.log(await addPerson(personData));
    setPerson(personData);
  }

  async function retrieveAPerson(id) {
    console.log(await getAPerson(id));
  }

  async function retrievePersons() {
    let rtnPersons = await getAllPersons(); 
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

  async function DeleteAllOfThePersons() {
    console.log("screens:PersonScreen:DeleteAllOfThePersons: START");
    console.log(await deleteAllPersons());    
    retrievePersons();
    console.log("screens:PersonScreen:DeleteAllOfThePersons: END");
  }


  function showPersonsOnScreen() {
    console.log("screens:Person:showNames: # of Persons: " + Persons.length);
    
    return Persons.map((Persons, index) => {
      return (
        <View key={index}>
          <Text style={styles.data}>{Persons.first} | {Persons.last} | {Persons.position}</Text>
        </View>
      );
    });
  };

  const Separator = () => <View style={styles.separator} />;
  const Space = () => <View style={styles.space} />;

  return (
    <SafeAreaView style={styles.container}>
      <View >
        
        <Text style={styles.title}>Persons</Text>
        
        {showPersonsOnScreen()}

        <Separator />

        <Space />

        <Button
            disabled={Persons.length == 0}
            onPress={DeleteAllOfThePersons}
            title="Delete All Persons"
            color="#841584"
            accessibilityLabel="Delete All Persons and refresh"
          />
        
        <Space />
        
        <Button
            disabled={Persons.length > 0}
            onPress={AddAllPerson}
            title="Add All Persons "
            color="#4267B2"
            accessibilityLabel="Add Persons and refresh"
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
