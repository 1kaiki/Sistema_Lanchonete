import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { lanches } from "../../db/DBlanches";
import { porcoes } from "../../db/DBporçoes";
import { bebidas } from "../../db/DBbebidas";
import { tabuas } from "../../db/DBtabuas";

const Drawer = createDrawerNavigator();

function LanchesContent() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>LANCHES</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {lanches.map((pess) => (
              <Card key={pess.id} style={styles.card}>
                <Card.Cover source={{ uri: pess.image }} style={styles.cardImage} />
                <Card.Content style={styles.cardContent}>
                  <Text style={[styles.txt, styles.itemName]}>{pess.name}</Text>
                  <Text style={[styles.txt, styles.itemDescription]}>{pess.description}</Text>
                  <Text style={[styles.txt, styles.itemPrice]}>{pess.price}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function AlacarteContent() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>PORÇÕES</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {porcoes.map((pess) => (
              <Card key={pess.id} style={styles.card}>
                <Card.Cover source={{ uri: pess.image }} style={styles.cardImage} />
                <Card.Content style={styles.cardContent}>
                  <Text style={[styles.txt, styles.itemName]}>{pess.name}</Text>
                  <Text style={[styles.txt, styles.itemDescription]}>{pess.description}</Text>
                  <Text style={[styles.txt, styles.itemPrice]}>{pess.price}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function BebidasContent() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>BEBIDAS</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {bebidas.map((pess) => (
              <Card key={pess.id} style={styles.card}>
                <Card.Cover source={{ uri: pess.image }} style={styles.cardImage} />
                <Card.Content style={styles.cardContent}>
                  <Text style={[styles.txt, styles.itemName]}>{pess.name}</Text>
                  <Text style={[styles.txt, styles.itemDescription]}>{pess.description}</Text>
                  <Text style={[styles.txt, styles.itemPrice]}>{pess.price}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function TabuasContent() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>TÁBUAS</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {tabuas.map((pess) => (
              <Card key={pess.id} style={styles.card}>
                <Card.Cover source={{ uri: pess.image }} style={styles.cardImage} />
                <Card.Content style={styles.cardContent}>
                  <Text style={[styles.txt, styles.itemName]}>{pess.name}</Text>
                  <Text style={[styles.txt, styles.itemDescription]}>{pess.description}</Text>
                  <Text style={[styles.txt, styles.itemPrice]}>{pess.price}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default function Lanches() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerLabelStyle: { fontSize: 16, color: '#fff' },
          drawerStyle: { backgroundColor: "#191414e1", width: 240 },
        }}
      >
        <Drawer.Screen name="LanchesScreen" component={LanchesContent} options={{ title: "Lanches" }} />
        <Drawer.Screen name="AlacarteScreen" component={AlacarteContent} options={{ title: "Porções" }} />
        <Drawer.Screen name="BebidasScreen" component={BebidasContent} options={{ title: "Bebidas" }} />
        <Drawer.Screen name="TabuasScreen" component={TabuasContent} options={{ title: "Tábuas" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#191414e1",
  },

  menu: {
    width: 100,
    backgroundColor: "#191414e1",
    alignItems: "center",
    paddingTop: 10,
  },

  botaoAtivo: {
    width: "100%",
    backgroundColor: "#208F70",
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
    backgroundColor: "#2a2a2a",
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
    color: '#fff'
  },

  card: {
    width: "44%",
    minHeight: 320,
    backgroundColor: "#2a2a2a",
    margin: 8,
    padding: 0,
    overflow: "hidden",
  },

  cardImage: {
    height: 140,
  },

  cardContent: {
    padding: 12,
  },

  itemName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: '#fff'
  },

  itemDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: '#ddd'
  },

  itemPrice: {
    fontSize: 16,
    color: '#fff',
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  txt: {
    color: '#fff'
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