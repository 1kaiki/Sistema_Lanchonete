import { View, Image, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function CadastroMesas({ navigation }) {
    const [numMesa, setNumMesa] = useState('');
    const [novoPedido, setNovoPedido] = useState('');

    function enviarDados() {
        navigation.navigate('TelaCozinha', {
            numMesa: numMesa,
            novoPedido: novoPedido
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.Images}>
                <Image style={styles.imagem} source={require('../../assets/restaurante.jpeg')} />
            </View>

            <View>
                <Text style={styles.textEdit}>EDITE OS PEDIDOS</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Nº Mesa'
                    value={numMesa}
                    onChangeText={setNumMesa}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Novo Pedido'
                    value={novoPedido}
                    onChangeText={setNovoPedido}
                />

                <View style={styles.buttonEdit}>
                    <Button
                        title='Enviar Pedido'
                        onPress={enviarDados}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2EB7B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 260,
        height: 45,
        backgroundColor: '#D9D9D9',
        marginBottom: 18,
        paddingLeft: 10,
        fontSize: 12
    },
    buttonEdit: {
        marginTop: 10,
        alignItems: 'center'
    },
    textEdit: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
        color: '#000'
    },
    Images: {
        marginBottom: 20
    },
    imagem: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    }
});
