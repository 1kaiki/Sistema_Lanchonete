import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export default function CadastroFuncionario() {

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  return (
    <View style={styles.container}>

      {/* titulo */}
      <View style={styles.topo}>
        <Text style={styles.txt_title}>
          Cadastro de Funcionário
        </Text>
      </View>

      {/* formulario */}
      <View style={styles.formulario}>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />

      </View>

      {/* botao */}
      <View style={styles.baixo}>

        <Button
          mode="contained"
          style={styles.button}
        >
          Cadastrar Funcionário
        </Button>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e9b67bff',
    padding: 20,
    justifyContent: 'center',
  },

  topo: {
    alignItems: 'center',
    marginBottom: 40,
  },

  txt_title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  formulario: {
    gap: 20,
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    width: 200,
    height: 50,
  },

  baixo: {
    alignItems: 'center',
    marginTop: 40,
  },

  button: {
    width: 250,
    backgroundColor: '#ee9a2dff',
    borderRadius: 20,
  },

});