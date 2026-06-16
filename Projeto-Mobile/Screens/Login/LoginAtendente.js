import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Services/FirebaseConfig';

export default function LoginAtendente({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function logarFuncionario() {
    try {
      const querySnapshot = await getDocs(collection(db, 'funcionarios'));
      let encontrou = false;

      querySnapshot.forEach((doc) => {
        const funcionario = doc.data();
        if (
          funcionario.email === email &&
          funcionario.cpf === senha &&
          funcionario.tipo === 'Atendente'
        ) {
          encontrou = true;
        }
      });

      if (encontrou) {
        alert('Login realizado!');
        navigation.navigate('ConsultarValores');
      } else {
        alert('Email ou senha incorretos');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao conectar ao servidor');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false} overScrollMode="never">
      <View>
        <View style={styles.topo} />

        <View style={styles.meio}>
          <Image source={require('../../assets/restaurantesemfundo.png')} style={styles.logo} />
        </View>

        <View style={styles.baixo}>
          <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />

          <TextInput label="Senha" secureTextEntry value={senha} onChangeText={setSenha} style={styles.input} />

          <Button mode="contained" style={styles.button} onPress={logarFuncionario}>
            Logar
          </Button>

          <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('EscolhaLogin')}>
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
    color: '#ffffffff',
  },

  logo: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
},

  button: {
    width: 250,
    marginTop: 50,
    backgroundColor: '#208F70'
  },
  ScrollView:{
    flex: 1
  },
  input:{
    marginBottom: 5,
    width: 250,
    backgroundColor: '#fff',
  }
});