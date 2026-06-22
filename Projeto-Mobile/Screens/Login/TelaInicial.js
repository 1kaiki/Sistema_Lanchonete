import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';


export default function TelaInicial({navigation} ) {
  return (
    <View style={styles.container}>
      <View style={styles.meio}>
        <Image
          source={require('../../assets/restaurantesemfundo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.baixo}>

        <Button 
        mode="contained" 
        style={styles.button}
        onPress={() =>
            navigation.navigate("EscolhaLogin")
          }>
        Logar
        </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#191414e1',
  alignItems: 'center',
  justifyContent: 'center',
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
  gap: 10, // separa os botões
},

  txt_title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },

  logo: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
},

  button: {
    width: 250,
    marginTop: 30,
    backgroundColor: '#208F70'
  },
});