import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';


export default function TelaInicial() {
  return (
    <View style={styles.container}>

      <View style={styles.topo}>
        <Text style={styles.txt_title}>Restaurante Garcia</Text>
      </View>

      <View style={styles.meio}>
        <Image
          source={require('../Sources/restaurante.png')}
          style={styles.logo}
        />
      </View>

      
      <View style={styles.baixo}>
        <Button mode="contained" style={styles.button}>
          Cadastrar
        </Button>

        <Button mode="contained" style={styles.button}>
          Logar
        </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9b67bff',
  },

  topo: {
    alignItems: 'center',
    paddingTop: 100,
  },

  meio: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
},

baixo: {
  alignItems: 'center',
  position: 'absolute',
  bottom: 300,
  width: '100%',
},

  txt_title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  logo: {
    width: 200,
    height: 200,
  },

  button: {
    width: 250,
    marginTop: 50,
    backgroundColor: '#ee9a2dff'
  },
});