import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { db } from '../../Services/FirebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function EditarPedidosGarcom({ navigation }) {

    const [numeroMesa, setNumeroMesa] = useState('');
    const [novoPedido, setNovoPedido] = useState('');
    const [novasObservacoes, setNovasObservacoes] = useState('');
    const [carregando, setCarregando] = useState(false);

    const EditarPedido = async () => {
        if (!numeroMesa || !novoPedido) {
            Alert.alert('Atenção', 'Preencha o número da mesa e o novo pedido.');
            return;
        }

        setCarregando(true);
        try {
            // Busca o documento da mesa pelo número (campo 'id' numérico)
            const mesasRef = collection(db, 'mesas');
            const q = query(mesasRef, where('id', '==', parseInt(numeroMesa)));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert('Mesa não encontrada', `Não há pedido registrado para a Mesa ${numeroMesa}. Cadastre primeiro no tab "Cadastrar".`);
                setCarregando(false);
                return;
            }

            // Atualiza o documento da mesa — reflete na cozinha automaticamente
            const mesaDoc = querySnapshot.docs[0];
            await updateDoc(doc(db, 'mesas', mesaDoc.id), {
                pedido: novoPedido,
                observacoes: novasObservacoes,
                status: 'ocupada',
                concluidoCozinha: false,   // reabre na cozinha
                pedidoPronto: false,        // reseta status pronto
                editadoEm: new Date(),
            });

            Alert.alert('Sucesso', `Pedido da Mesa ${numeroMesa} atualizado! A cozinha verá a alteração.`);
            setNumeroMesa('');
            setNovoPedido('');
            setNovasObservacoes('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível editar o pedido.');
            console.log('Erro ao editar pedido:', error);
        }
        setCarregando(false);
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

                <TextInput
                    placeholder="OBSERVAÇÕES (opcional)"
                    placeholderTextColor="#999"
                    value={novasObservacoes}
                    onChangeText={setNovasObservacoes}
                    style={[styles.txtInput, styles.txtInputObs]}
                />

                <TouchableOpacity
                    style={[styles.botaoEnviar, carregando && { opacity: 0.6 }]}
                    onPress={EditarPedido}
                    disabled={carregando}
                >
                    {carregando
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.botaoTexto}>SALVAR ALTERAÇÃO</Text>
                    }
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
