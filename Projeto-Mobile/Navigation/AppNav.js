import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaGerente from '../Screens/Gerente/TelaGerente';
import VisualizacaoMesa from '../Screens/Gerente/VisualizacaoMesa';

const Stack = createNativeStackNavigator();

export default function AppNav() {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="TelaGerente"
                    component={TelaGerente}
                />

                <Stack.Screen
                    name="VisualizacaoMesa"
                    component={VisualizacaoMesa}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}