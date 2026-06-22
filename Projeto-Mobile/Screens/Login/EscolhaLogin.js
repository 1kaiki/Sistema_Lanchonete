import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';


export default function EscolhaLogin({navigation}) {
  return (
    <ScrollView 
    contentContainerStyle={styles.container}
    bounces={false}
    overScrollMode="never">
    <View>

      <View style={styles.meio}>
        <Image
          source={require('../../assets/restaurantesemfundo.png')}
          style={styles.logo}
        />
      </View>

      
      <View style={styles.baixo}>
        <Button mode="contained" style={styles.button} onPress={() =>
            navigation.navigate("LoginAtendente")
          }>
          Atendente
        </Button>

        <Button mode="contained" style={styles.button} onPress={() =>
            navigation.navigate("LoginCozinha")
          }>
          Cozinha
        </Button>

        <Button mode="contained" style={styles.button} onPress={() =>
            navigation.navigate("LoginGerente")
          }>
          Gerente
        </Button>

        <Button mode="contained" style={styles.button} onPress={() =>
            navigation.navigate("LoginGarcom")
          }>
          Garçom
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
  ScrollView:{
    flex: 1
  }
});