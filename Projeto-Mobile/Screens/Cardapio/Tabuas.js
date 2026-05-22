import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Button, Card } from "react-native-paper";

export default function Tabuas({navigation}) {
  const comidas = [
    { id: 1, nome: "", descricao: "", valor: "" },
    { id: 2, nome: "", descricao: "", valor: "" },
    { id: 3, nome: "", descricao: "", valor: "" },
    { id: 4, nome: "", descricao: "", valor: "" },
    { id: 5, nome: "", descricao: "", valor: "" },
    { id: 6, nome: "", descricao: "", valor: "" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
       <TouchableOpacity style={styles.botaoAtivo} onPress={() => navigation.navigate("Alacarte")}>
                         <Text style={styles.textoBotaoAtivo} >CARDÁPIO{"\n"}ALACARTE</Text>
                       </TouchableOpacity>
               
                       <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Bebidas")}>
                         <Text style={styles.textoBotao}>CARDÁPIO{"\n"}BEBIDAS</Text>
                       </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoAtivo} onPress={() => navigation.navigate("Tabuas")}>
                         <Text style={styles.textoBotaoAtivo}>CARDÁPIO{"\n"}TABUAS</Text>
                       </TouchableOpacity>
               
                        <TouchableOpacity style={styles.botaoAtivo} onPress={() => navigation.navigate("Lanches")}>
                         <Text style={styles.textoBotaoAtivo}>CARDÁPIO{"\n"}LANCHES</Text>
                       </TouchableOpacity>
      </View>

      
        <View style={styles.conteudo}>
  <Text style={styles.titulo}>TABUAS</Text>

  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.cardsContainer}>
      {comidas.map((pess) => (
        <Card key={pess.id} style={styles.card}>
          <Card.Content style={styles.cards}>
            <Text style={styles.txt}>{pess.nome}</Text>
            <Text style={styles.txt}>{pess.descricao}</Text>
            <Text style={styles.txt}>{pess.valor}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
    
  </ScrollView>
</View>

</View>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F2EB7B",
  },

  menu: {
    width: 100,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    paddingTop: 10,
  },

  botaoAtivo: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 10,
  },

  textoBotaoAtivo: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  botao: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },

  textoBotao: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },

  conteudo: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },

  titulo: {
    fontSize: 50,
    marginBottom: 30,
    
  },

  card: {
  width: "43%",
  height: "70%",
  backgroundColor: "#D9D9D9",
  margin: 10,
  padding: 20,
},

  cardsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
},

  texto: {
    fontSize: 26,
    marginBottom: 70,
  },

  textoDescricao: {
    fontSize: 26,
    marginBottom: 50,
  },

  textoValor: {
    fontSize: 26,
  },
});