import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

import {
  Button,
  TextInput
} from 'react-native-paper';

import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore';

import app from '../../Services/FirebaseConfig';

export default function LoginGarcom({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const db = getFirestore(app);

  async function logarFuncionario() {

    try {

      const querySnapshot = await getDocs(
        collection(db, "funcionarios")
      );

      let encontrou = false;

      querySnapshot.forEach((doc) => {

        const funcionario = doc.data();

        if(
          funcionario.email === email
          &&
          funcionario.cpf === senha
          &&
          funcionario.tipo === "Garçom"
        ) {

          encontrou = true;

        }

      });

      if(encontrou) {

        alert("Login realizado!");

        // tela depois do login
        navigation.navigate("TelaGarcom");

      }

      else {

        alert("Email ou senha incorretos");

      }

    } catch(error) {

      console.log(error);

    }

  }

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      overScrollMode="never"
    >

      <View style={styles.container}>

        <View style={styles.topo}>
          <Text style={styles.txt_title}>
            Login Garçom
          </Text>
        </View>

        <View style={styles.meio}>
          <Image
            source={require('../../assets/restaurante.jpeg')}
            style={styles.logo}
          />
        </View>

        <View style={styles.baixo}>

          <TextInput
            label='Email'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            label='Senha'
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
          />

          <Button
            mode="contained"
            style={styles.button}

            onPress={logarFuncionario}
          >
            Logar
          </Button>

          <Button
            mode="contained"
            style={styles.button}

            onPress={() =>
              navigation.navigate('EscolhaLogin')
            }
          >
            Voltar
          </Button>

        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#e9b67bff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },

  topo: {
    alignItems: 'center',
  },

  meio: {
    alignItems: 'center',
  },

  baixo: {
    alignItems: 'center',
  },

  txt_title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  button: {
    width: 250,
    marginTop: 30,
    backgroundColor: '#ee9a2dff'
  },

  input: {
    width: 250,
    marginBottom: 10,
    backgroundColor: '#fff',
  }

});