import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import { db } from '../../Services/FirebaseConfig';

import {collection, onSnapshot} from 'firebase/firestore';

export default function LucroDiario() {

    const [pagamentos, setPagamentos] = useState([]);
    const [totalHoje, setTotalHoje] = useState(0);

    useEffect(() => {

        const unsubscribe = onSnapshot(
            collection(db, 'pagamentos'),
            (snapshot) => {

                let lista = [];
                let total = 0;

                const hoje = new Date();

                snapshot.forEach((doc) => {

                    const dados = doc.data();

                    lista.push(dados);

                    if (dados.dataPagamento) {

                        const dataPagamento =
                            dados.dataPagamento.toDate();

                        if (
                            dataPagamento.getDate() === hoje.getDate() &&
                            dataPagamento.getMonth() === hoje.getMonth() &&
                            dataPagamento.getFullYear() === hoje.getFullYear()
                        ) {

                            total += Number(
                                dados.valorPago || 0
                            );

                        }

                    }

                });

                setPagamentos(lista);
                setTotalHoje(total);

            }
        );

        return () => unsubscribe();

    }, []);

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.titulo}>
                Lucro Diário
            </Text>

            <View style={styles.cardTotal}>

                <Text style={styles.label}>
                    Total arrecadado hoje
                </Text>

                <Text style={styles.valor}>
                    R$ {totalHoje.toFixed(2)}
                </Text>

            </View>

            <Text style={styles.subtitulo}>
                Pagamentos de Hoje
            </Text>

            {pagamentos.map((item, index) => (

                <View
                    key={index}
                    style={styles.cardPagamento}
                >

                    <Text>
                        Mesa: {item.mesa}
                    </Text>

                    <Text>
                        Valor: R$ {item.valorPago}
                    </Text>

                </View>

            ))}

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#191414',
        padding: 20,
    },

    titulo: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    cardTotal: {
        backgroundColor: '#208F70',
        borderRadius: 15,
        padding: 20,
        marginBottom: 25,
    },

    label: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },

    valor: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },

    subtitulo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    cardPagamento: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },

});