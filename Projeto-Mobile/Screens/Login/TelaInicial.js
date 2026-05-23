import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';


export default function TelaInicial({navigation} ) {
  return (
    <View style={styles.container}>

      <View style={styles.topo}>
        <Text style={styles.txt_title}>Restaurante Garcia</Text>
      </View>

      <View style={styles.meio}>
        <Image
          source={require('../../assets/restaurante.jpeg')}
          style={styles.logo}
        />
      </View>

      
      <View style={styles.baixo}>

        {/* tirar o botão de cadastrar */}

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
  gap: 10, // separa os botões
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
});