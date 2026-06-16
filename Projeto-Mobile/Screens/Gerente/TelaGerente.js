import * as React from 'react';
import { View, Text, StyleSheet } from "react-native"; // ESTILIZAÇÃO NOVA
import { Button } from 'react-native-paper';

export default function TelaGerente({navigation}) {
    return(
        <View style={styles.container}>

            {/* parte do titulo da pagina */}
            <View style={styles.ViewTopo}>
                <Text style={styles.titulo_pagina}>Gerenciamento do Restaurante</Text>
            </View>

            {/* parte dos botoes da pagina */}
            <View style={styles.ViewBotao}>

                <Button 
                mode="contained" 
                style={styles.Button} 
                icon="clipboard-list"
                onPress={() =>
                navigation.navigate("PedidosDiarios")}>
                Pedidos{'\n'}Diários

                </Button>

                <Button 
                mode="contained" 
                style={styles.Button} 
                icon="cash"
                onPress={() =>
                navigation.navigate("LucroDiario")}>       
                Lucro Diário{'\n'}da empresa
                </Button>

            </View>

            {/* botão que fica no centro */}
            <View style={styles.ViweButtonCentral}>
                
                <Button
                 mode="contained"
                style={styles.ButtonCentraL} 
                icon="silverware-fork-knife"
                
                onPress={() =>
                    navigation.navigate("VisualizacaoMesa")
                    }
                >
                    Visualização{'\n'}das Mesas
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#191414e1', // ESTILIZAÇÃO NOVA
    padding: 20,
    alignItems: 'center', // ESTILIZAÇÃO NOVA
    justifyContent: 'center', // ESTILIZAÇÃO NOVA - centraliza verticalmente
},

ViewTopo: {
    alignItems: 'center',
},

titulo_pagina: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffffff', // ESTILIZAÇÃO NOVA
},

/* topoImagem and logo removed (image taken out) */

ViewBotao: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, // ESTILIZAÇÃO NOVA - reduz distância para centralizar
    gap: 20,
},

Button: {
    width: '45%',
    maxWidth: 350,
    minWidth: 160,
    borderRadius: 30,
    backgroundColor: "#208F70", // ESTILIZAÇÃO NOVA
},

ViweButtonCentral: {
    alignItems: 'center',
    marginTop: 20, // ESTILIZAÇÃO NOVA
},

ButtonCentraL: {
    width: 220,
    borderRadius: 20,
    backgroundColor: "#208F70", // ESTILIZAÇÃO NOVA
}

})