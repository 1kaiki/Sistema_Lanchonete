import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
 
export default function CadastroMesasGarcom({ navigation, route }) {
 
    const nomeGarcom = route?.params?.nomeGarcom || '';
 
    const [numeroMesa, setNumeroMesa] = useState('');
    const [pedido, setPedido] = useState('');
    const [observacoes, setObservacoes] = useState('');
 
    const EnviarPedido = async () => {
    if (!numeroMesa || !pedido) {
        Alert.alert('Atenção', 'Preencha o número da mesa e o pedido.');
        return;
    }

    try {
        const mesaNum = Number(numeroMesa);

        const qMesa = query(
            collection(db, 'mesas'),
            where('id', '==', mesaNum)
        );

        const snapshot = await getDocs(qMesa);

        if (snapshot.empty) {
            Alert.alert(
                'Mesa não encontrada',
                `A mesa ${numeroMesa} não existe no sistema.`
            );
            return;
        }

        const mesaDoc = snapshot.docs[0];
        const dadosMesa = mesaDoc.data();

        if (
            dadosMesa.status === 'ocupada' &&
            dadosMesa.pedido
        ) {
            Alert.alert(
                'Mesa ocupada',
                `A mesa ${numeroMesa} já possui um pedido em andamento.`
            );
            return;
        }

        await updateDoc(
            doc(db, 'mesas', mesaDoc.id),
            {
                pedido,
                observacoes,
                nomeGarcom,
                status: 'ocupada',
                chamouGarcom: false,
                concluidoCozinha: false,
                pedidoPronto: false,
                criadoEm: new Date(),
            }
        );

        Alert.alert(
            'Sucesso',
            'Pedido enviado com sucesso!'
        );

        setNumeroMesa('');
        setPedido('');
        setObservacoes('');

        navigation.goBack();

    } catch (error) {
        console.log('Erro ao cadastrar pedido:', error);

        Alert.alert(
            'Erro',
            'Não foi possível enviar o pedido.'
        );
    }
};
 
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
 
                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.botaoVoltarTexto}>← VOLTAR</Text>
                </TouchableOpacity>
 
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/restaurante.jpeg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
 
                <Text style={styles.titulo}>Cadastre a nova mesa</Text>
 
                <TextInput
                    placeholder="NÚMERO MESA"
                    placeholderTextColor="#999"
                    value={numeroMesa}
                    onChangeText={setNumeroMesa}
                    style={styles.txtInput}
                    keyboardType="numeric"
                />
 
                <TextInput
                    placeholder="PEDIDO"
                    placeholderTextColor="#999"
                    value={pedido}
                    onChangeText={setPedido}
                    style={styles.txtInput}
                />
 
                <TextInput
                    placeholder="OBSERVAÇÕES"
                    placeholderTextColor="#999"
                    value={observacoes}
                    onChangeText={setObservacoes}
                    style={[styles.txtInput, styles.txtInputObs]}
                />
 
                <TouchableOpacity style={styles.botaoEnviar} onPress={EnviarPedido}>
                    <Text style={styles.botaoTexto}>ENVIAR PEDIDO</Text>
                </TouchableOpacity>
 
            </View>
        </ScrollView>
    );
}
 
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9b67bff',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    botaoVoltar: {
        alignSelf: 'flex-start',
        backgroundColor: '#e53935',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    botaoVoltarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    logoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 90,
    },
    logo: {
        width: 240,
        height: 70,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#222',
    },
    txtInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#d9d9d9',
        borderRadius: 6,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 14,
        color: '#333',
    },
    txtInputObs: {
        borderWidth: 2,
        borderColor: '#1565C0',
    },
    botaoEnviar: {
        backgroundColor: '#e53935',
        borderRadius: 6,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 10,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
 