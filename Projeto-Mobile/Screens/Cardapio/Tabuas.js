import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { tabuas } from "../../db/DBtabuas";
import { porcoes } from "../../db/DBporçoes";
import { bebidas } from "../../db/DBbebidas";
import { lanches } from "../../db/DBlanches";

const Drawer = createDrawerNavigator();

function TabuasContent() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>TABUAS</Text>
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

export default function Tabuas() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerLabelStyle: { fontSize: 16 },
          drawerStyle: { backgroundColor: "#D9D9D9", width: 240 },
        }}
      >
        <Drawer.Screen name="TabuasScreen" component={TabuasContent} options={{ title: "Tábuas" }} />
        <Drawer.Screen name="AlacarteScreen" component={AlacarteContent} options={{ title: "Porções" }} />
        <Drawer.Screen name="BebidasScreen" component={BebidasContent} options={{ title: "Bebidas" }} />
        <Drawer.Screen name="LanchesScreen" component={LanchesContent} options={{ title: "Lanches" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EB7B",
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
    width: "44%",
    minHeight: 320,
    backgroundColor: "#D9D9D9",
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
  },

  itemDescription: {
    fontSize: 14,
    marginBottom: 8,
  },

  itemPrice: {
    fontSize: 16,
    color: "#333",
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