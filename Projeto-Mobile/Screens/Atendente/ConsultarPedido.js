import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mesas } from '../../db/DBmesas.js';

export default function ConsultarPedido({ route }) {

    const { mesaId } = route.params;
    const mesa = mesas.find((m) => m.id === mesaId);

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>{mesa.nome}</Text>

            <View style={styles.card}>

                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderTxt}>Detalhes do Pedido</Text>
                </View>

                <View style={styles.cardBody}>

                    <View style={styles.linha}>
                        <Text style={styles.label}>Pedido:</Text>
                        <Text style={styles.valor}>
                            {mesa.pedido ? mesa.pedido : 'Nenhum pedido registrado'}
                        </Text>
                    </View>

                    <View style={styles.divisor} />

                    <View style={styles.linha}>
                        <Text style={styles.label}>Valor:</Text>
                        <Text style={styles.valorDestaque}>
                            {mesa.valor ? `R$ ${mesa.valor}` : 'R$ 0,00'}
                        </Text>
                    </View>

                </View>

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

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#000',
        overflow: 'hidden',
    },

    cardHeader: {
        backgroundColor: '#ee9a2dff',
        padding: 15,
        alignItems: 'center',
    },

    cardHeaderTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },

    cardBody: {
        padding: 20,
        gap: 15,
    },

    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    valor: {
        fontSize: 17,
        color: '#555',
        flexShrink: 1,
        textAlign: 'right',
    },

    valorDestaque: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#32cd32',
    },

    divisor: {
        height: 2,
        backgroundColor: '#ddd',
        borderRadius: 1,
    },

});