import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


export default function LoginCozinha({navigation}) {
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
        <TextInput style={styles.input}
        placeholder='Login'
            
        />
        <TextInput
        placeholder='Senha'
            
        />

        <Button mode="contained" style={styles.button}>
          Logar
        </Button>

        <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('EscolhaLogin')} >
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
  ScrollView:{
    flex: 1
  },
  input:{
    marginBottom: 5
  }
});