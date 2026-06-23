import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import { db } from '../../Services/FirebaseConfig';

import {
    doc,
    updateDoc,
    addDoc,
    collection
} from 'firebase/firestore';

export default function PagamentoMesa({ navigation, route }) {

    const mesa = route?.params?.mesa;

    const [valorPago, setValorPago] = useState('');

    async function finalizarPagamento() {

    if (!valorPago) {

        Alert.alert(
            'Atenção',
            'Informe o valor pago.'
        );

        return;
    }

    try {

        // Salva o pagamento
        await addDoc(
            collection(db, 'pagamentos'),
            {
                mesa: mesa.id,
                pedido: mesa.pedido || '',
                observacoes: mesa.observacoes || '',
                nomeGarcom: mesa.nomeGarcom || '',
                valorPago: Number(valorPago),
                dataPagamento: new Date(),
            }
        );

        // Libera a mesa
        await updateDoc(
            doc(
                db,
                'mesas',
                mesa.firebaseId
            ),
            {
                status: 'livre',
                pedido: '',
                observacoes: '',
                nomeGarcom: '',
                chamouGarcom: false,
                pedidoPronto: false,
                concluidoCozinha: false,
            }
        );

        Alert.alert(
            'Sucesso',
            'Pagamento registrado e mesa liberada!'
        );

        navigation.goBack();

    } catch (error) {

        console.log(
            'Erro ao finalizar pagamento:',
            error
        );

        Alert.alert(
            'Erro',
            'Não foi possível finalizar o pagamento.'
        );

    }

}

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Pagamento da Mesa {mesa?.id}
            </Text>

            <Text style={styles.label}>
                Valor Pago
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ex: 50,00"
                keyboardType="numeric"
                value={valorPago}
                onChangeText={setValorPago}
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={finalizarPagamento}
            >
                <Text style={styles.botaoTexto}>
                    Confirmar Pagamento
                </Text>
            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#191414e1',
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },

    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
    },

    botao: {
        backgroundColor: '#43a047',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    botaoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});