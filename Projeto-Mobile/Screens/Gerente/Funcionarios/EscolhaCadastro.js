import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function EscolhaCadastro({ navigation }) {

    return(

        <View style={styles.container}>
            {/* titulo */}
            <View style={styles.topo}>
                <Text style={styles.titulo}>
                    Cadastro de Funcionários
                </Text>

                <Text style={styles.subtitulo}>
                    Escolha qual funcionário deseja cadastrar
                </Text>
            </View>

            {/* botoes */}
            <View style={styles.areaBotoes}>

                <Button
                    mode="contained"
                    style={styles.button}
                    icon="silverware-fork-knife"
                    onPress={() => navigation.navigate("CadastroGarcom")}
                >
                    Garçom
                </Button>

                <Button
                    mode="contained"
                    style={styles.button}
                    icon="account-tie"
                    onPress={() => navigation.navigate("CadastroAtendente")}
                >
                    Atendente
                </Button>

                <Button
                    mode="contained"
                    style={styles.button}
                    icon="chef-hat"
                    onPress={() => navigation.navigate("CadastroCozinha")}
                >
                    Cozinheira
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#191414e1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    topo: {
        alignItems: 'center',
        marginBottom: 40,
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffffff',
    },

    subtitulo: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        color: '#dcdcdc',
    },

    areaBotoes: {
        width: '100%',
        alignItems: 'center',
        gap: 25,
    },

    button: {
        width: '85%',
        maxWidth: 350,
        backgroundColor: '#208F70',
        borderRadius: 20,
        paddingVertical: 8,
    },

});