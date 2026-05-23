import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EscolhaCadastro from '../Screens/Gerente/Funcionarios/EscolhaCadastro';

import CadastroGarcom from '../Screens/Gerente/Funcionarios/CadastroGarcom';
import CadastroAtendente from '../Screens/Gerente/Funcionarios/CadastroAtendente';
import CadastroCozinha from '../Screens/Gerente/Funcionarios/CadastroCozinha';

const Stack = createNativeStackNavigator();

export default function StackCadastro() {

    return(

        <Stack.Navigator>

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