import { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../Services/FirebaseConfig';

const db = getFirestore(app);

export default function LoginCozinha({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function logarFuncionario() {
    try {
      const querySnapshot = await getDocs(collection(db, "funcionarios"));
      let encontrou = false;

      querySnapshot.forEach((doc) => {
        const funcionario = doc.data();
        if (
          funcionario.email === email &&
          funcionario.cpf === senha &&
          funcionario.tipo === "Cozinheira"
        ) {
          encontrou = true;
        }
      });

      if (encontrou) {
        alert("Login realizado!");
        navigation.navigate("VisualizarPedidosCozinha");
      } else {
        alert("Email ou senha incorretos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      bounces={false}
      overScrollMode="never">
      <View style={styles.container}>

        <View style={styles.topo}>
          <Text style={styles.txt_title}>Login Cozinha</Text>
        </View>

        <View style={styles.meio}>
          <Image
            source={require('../../assets/restaurante.jpeg')}
            style={styles.logo}
          />
        </View>

        <View style={styles.baixo}>
          <TextInput
            style={styles.input}
            placeholder='Login'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder='Senha'
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

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
    marginTop: 50,
    backgroundColor: '#ee9a2dff'
  },
  ScrollView: {
    flex: 1
  },
  input: {
    marginBottom: 5
  }
});