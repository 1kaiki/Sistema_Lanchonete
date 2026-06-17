import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Visualizacao from '../Screens/Gerente/Funcionarios/Visualizacao';
import EditarFuncionario from '../Screens/Gerente/Funcionarios/EditarFuncionario';

const Stack = createNativeStackNavigator();

export default function StackFuncionarios() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="VisualizacaoFuncionario"
                component={Visualizacao}
                options={{
                    title: 'Funcionários'
                }}
            />

            <Stack.Screen
                name="EditarFuncionario"
                component={EditarFuncionario}
                options={{
                    title: 'Editar Funcionário'
                }}
            />

        </Stack.Navigator>
    );
}