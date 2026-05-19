import {View,Image,Text,TextInput,Button,StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

export default function CadastroMesas({navigation}){
    const[numMesa,setNumMesa]= useState('');
    const[novoPedido,setNovoPedido]=useState('');
    const[observacoes,setObservacoes]=useState('');
    // criar função para armazenar os dados que serao enviados e coloca a tela que sera enviada
    function enviarDados(){
        navigation.navigate('PedidoPendente',{
            numMesa: numMesa,
            novoPedido: novoPedido
        });
    }
    return(
        <View style={styles.container}>
            <View style={styles.Images}>
                <Image style={styles.imagem} source={require('../../assets/restaurante.jpeg')}></Image>
            </View>
            
            <View>
                <Text style={styles.textEdit}>CADASTRAR MESAS</Text>

                <TextInput
                style={styles.input}
                placeholder='Nº Mesa'
                value={numMesa}
                onChangeText={setNumMesa}
                />

                <TextInput
                style={styles.input}
                placeholder='Pedido'
                value={novoPedido}
                onChangeText={setNovoPedido}
                />
                <TextInput
                style={styles.input}
                placeholder='Observações'
                value={observacoes}
                onChangeText={setObservacoes}
                />
                <View style={styles.buttonEdit}>
                    <Button
                    title='Enviar Pedido'
                    onPress={enviarDados}
                    />
                </View>

            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F2EB7B',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:260,
        height:45,
        backgroundColor:'#D9D9D9',
        marginBottom:18,
        paddingLeft:10,
        fontSize:12
    },
    buttonEdit:{
        marginTop:10,
        alignItems:'center'
    },
    textEdit:{
        fontSize:20,
        marginBottom:30,
        textAlign:'center',
        color:'#000'
    },
    Images:{
        marginBottom:20
    },
    imagem:{
        width:120,
        height:120,
        resizeMode:'contain'
    }
})