import * as React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';

export default function TelaGerente() {
    return(
        <View style={styles.container}>

            {/* parte do titulo da pagina */}
            <View style={styles.ViewTopo}>
                <Text style={styles.titulo_pagina}>Gerenciamento do Restaurante</Text>
            </View>

            {/* parte dos botoes da pagina */}
            <View style={styles.ViewBotao}>

                <Button mode="contained" style={styles.Button} icon="clipboard-list">
                    Pedidos<br></br> Diários
                </Button>

                 <Button mode="contained" style={styles.Button} icon="cash">
                    Lucro Diário<br></br> da empresa
                </Button>
            </View>

            {/* botão que fica no centro */}
            <View style={styles.ViweButtonCentral}>
                <Button mode="contained" style={styles.ButtonCentraL} icon="silverware-fork-knife">
                    Visualização<br></br> das Mesas
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#e9b67bff',
    padding: 20,
},

ViewTopo: {
    alignItems: 'center',
},

titulo_pagina: {
    fontSize: 30,
    fontWeight: 'bold',
},

ViewBotao: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
    gap: 20,
},

Button: {
    width: '45%',
    maxWidth: 350,
    minWidth: 160,
    borderRadius: 30,
    backgroundColor: "#ee9a2dff",
},

ViweButtonCentral: {
    alignItems: 'center',
    marginTop: 180,
},

ButtonCentraL: {
    width: 220,
    borderRadius: 0,
    backgroundColor: "#ee9a2dff",
    borderRadius: 20,
}

})