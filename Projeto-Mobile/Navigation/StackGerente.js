import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaGerente from '../Screens/Gerente/TelaGerente';
import VisualizacaoMesa from '../Screens/Gerente/VisualizacaoMesa';
import PedidoDiario from '../Screens/Gerente/PedidoDiario';
import LucroDiario from '../Screens/Gerente/LucroDiario';

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

        </Stack.Navigator>

    );
}