import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../Services/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginGarcom({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const db = getFirestore(app);

  async function logarFuncionario() {
    try {
      const querySnapshot = await getDocs(collection(db, 'funcionarios'));

      let encontrou = false;
      let nomeGarcom = '';

      querySnapshot.forEach((doc) => {
        const funcionario = doc.data();
        if (
          funcionario.email === email &&
          funcionario.cpf === senha &&
          funcionario.tipo === 'Garçom'
        ) {
          encontrou = true;
          nomeGarcom = funcionario.nome || 'Garçom';
        }
      });

  if (encontrou) {
    await AsyncStorage.setItem('nomeGarcom', nomeGarcom);

    alert('Login realizado!');
    navigation.navigate('TelaGarcom');
  } else {
    alert('Email ou senha incorretos');
    }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      overScrollMode="never"
    >
      <View>

        <View style={styles.meio}>
          <Image
            source={require('../../assets/restaurantesemfundo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.baixo}>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            label="Senha"
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
            onPress={() => navigation.navigate('EscolhaLogin')}
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
    backgroundColor: '#191414e1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  topo: { alignItems: 'center' },
  meio: { alignItems: 'center' },
  baixo: { alignItems: 'center' },
  txt_title: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  logo: { width: 200, height: 200, resizeMode: 'contain' },
  button: { width: 250, marginTop: 30, backgroundColor: '#208F70' },
  input: { width: 250, marginBottom: 10, backgroundColor: '#fff' },
});
