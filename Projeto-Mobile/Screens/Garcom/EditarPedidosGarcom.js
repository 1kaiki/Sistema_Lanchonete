import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { database } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function EditarPedidosGarcom({ navigation }) {

    const [numeroMesa, setNumeroMesa] = useState('');
    const [novoPedido, setNovoPedido] = useState('');

    const EnviarPedido = async () => {
        if (!numeroMesa || !novoPedido) {
            Alert.alert('Atenção', 'Preencha o número da mesa e o novo pedido.');
            return;
        }
        try {
            // TODO: Defina o nome da coleção no Firebase conforme necessário
            // Este envio direciona o pedido para a VisualizarPedidosCozinha
            await addDoc(collection(database, 'pedidosCozinha'), {
                numeroMesa,
                pedido: novoPedido,
                status: 'pendente',
                criadoEm: new Date()
            });
            Alert.alert('Sucesso', 'Pedido enviado para a cozinha!');
            setNumeroMesa('');
            setNovoPedido('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível enviar o pedido.');
            console.log('Erro ao enviar pedido:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>

                {/* Logo do Restaurante */}
                <View style={styles.logoContainer}>
                    {/* TODO: Substitua a URI pelo link da imagem do restaurante */}
                    <Image
                        source={{ uri: 'URL_DA_IMAGEM_DO_RESTAURANTE' }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.titulo}>GERENCIE OS PEDIDOS</Text>

                <TextInput
                    placeholder="NÚMERO MESA"
                    placeholderTextColor="#999"
                    value={numeroMesa}
                    onChangeText={setNumeroMesa}
                    style={styles.txtInput}
                    keyboardType="numeric"
                />

                <TextInput
                    placeholder="NOVO PEDIDO"
                    placeholderTextColor="#999"
                    value={novoPedido}
                    onChangeText={setNovoPedido}
                    style={styles.txtInput}
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