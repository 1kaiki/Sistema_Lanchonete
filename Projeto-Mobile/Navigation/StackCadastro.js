import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EscolhaCadastro from '../Screens/Gerente/Funcionarios/EscolhaCadastro';

//TIPO DE CADASTRO QUE VAI QUERER
import CadastroGarcom from '../Screens/Gerente/Funcionarios/CadastroGarcom';
import CadastroAtendente from '../Screens/Gerente/Funcionarios/CadastroAtendente';
import CadastroCozinha from '../Screens/Gerente/Funcionarios/CadastroCozinha';

const Stack = createNativeStackNavigator();

export default function StackCadastro() {

    return(

        <Stack.Navigator>
            {/*ESCOLHA DOS CADASTRO COM NAVEGACAO STACK, GARCOM, ATENDENTE, COZINHA */}
            <Stack.Screen
                name="EscolhaCadastro"
                component={EscolhaCadastro}
                options={{
                    title: 'Cadastro de Funcionários',
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="CadastroGarcom"
                component={CadastroGarcom}
            />

            <Stack.Screen
                name="CadastroAtendente"
                component={CadastroAtendente}
            />

            <Stack.Screen
                name="CadastroCozinha"
                component={CadastroCozinha}
            />

        </Stack.Navigator>

    );
}