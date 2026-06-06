import { createNativeStackNavigator } from '@react-navigation/native-stack';

//TELAS DO GERENTE 
import TelaGerente from '../Screens/Gerente/TelaGerente';
import VisualizacaoMesa from '../Screens/Gerente/VisualizacaoMesa';
import PedidoDiario from '../Screens/Gerente/PedidoDiario';
import LucroDiario from '../Screens/Gerente/LucroDiario';
import EscolhaCadastro from '../Screens/Gerente/Funcionarios/EscolhaCadastro';
import EditarFuncionario from '../Screens/Gerente/Funcionarios/EditarFuncionario';

//TIPOS DE CADASTRO
import CadastroGarcom from '../Screens/Gerente/Funcionarios/CadastroGarcom';
import CadastroAtendente from '../Screens/Gerente/Funcionarios/CadastroAtendente';
import CadastroCozinha from '../Screens/Gerente/Funcionarios/CadastroCozinha';

const Stack = createNativeStackNavigator();

export default function StackGerente() {

    return(

        <Stack.Navigator>

            <Stack.Screen
                name="TelaGerente"
                component={TelaGerente}
            />

            <Stack.Screen
                name="VisualizacaoMesa"
                component={VisualizacaoMesa}
            />

            <Stack.Screen
                name="PedidosDiarios"
                component={PedidoDiario}
            />

            <Stack.Screen
                name="LucroDiario"
                component={LucroDiario}
            />

            <Stack.Screen
                name="EscolhaCadastro"
                component={EscolhaCadastro}
                options={{
                    title: 'Cadastro de Funcionários'
                }}
            />

            <Stack.Screen
                name="CadastroGarcom"
                component={CadastroGarcom}
                options={{
                    title: 'Cadastro Garçom'
                }}
            />

            <Stack.Screen
                name="CadastroAtendente"
                component={CadastroAtendente}
                options={{
                    title: 'Cadastro Atendente'
                }}
            />

            <Stack.Screen
                name="CadastroCozinha"
                component={CadastroCozinha}
                options={{
                    title: 'Cadastro Cozinha'
                }}
            />

            <Stack.Screen
                name="EditarFuncionario"
                component={EditarFuncionario}
            />

        </Stack.Navigator>

    );
}