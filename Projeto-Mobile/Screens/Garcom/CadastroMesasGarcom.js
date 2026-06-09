import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { database } from '../../Services/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function CadastroMesasGarcom({ navigation }) {

    const [numeroMesa, setNumeroMesa] = useState('');
    const [pedido, setPedido] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const EnviarPedido = async () => {
        if (!numeroMesa || !pedido) {
            Alert.alert('Atenção', 'Preencha o número da mesa e o pedido.');
            return;
        }
        try {
            // TODO: Defina o nome da coleção no Firebase conforme necessário
            await addDoc(collection(database, 'mesas'), {
                numeroMesa,
                pedido,
                observacoes,
                chamouGarcom: false,
                criadoEm: new Date()
            });
            Alert.alert('Sucesso', 'Pedido enviado!');
            setNumeroMesa('');
            setPedido('');
            setObservacoes('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível enviar o pedido.');
            console.log('Erro ao cadastrar mesa:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
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
                    style={[styles.txtInput, styles.txtInputFocused]}
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
        backgroundColor: '#f5f542',
        paddingHorizontal: 30,
        paddingVertical: 40,
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
        width: 140,
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
    txtInputFocused: {
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