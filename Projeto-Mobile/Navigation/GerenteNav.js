import { createDrawerNavigator } from '@react-navigation/drawer';

import StackGerente from './StackGerente';
import Cadastro from '../Screens/Gerente/Funcionarios/Cadastro';
import Visualizacao from '../Screens/Gerente/Funcionarios/Visualizacao';

const Drawer = createDrawerNavigator();

export default function GerenteNav() {

    return(

        <Drawer.Navigator>

            <Drawer.Screen
                name="Home"
                component={StackGerente}
            />

            <Drawer.Screen
                name="VisualizacaoFuncionario"
                component={Visualizacao}
                options={{
                    title: 'Visualização de funcionario'
                }}
            />

            <Drawer.Screen
                name="PedidosDiariosFuncionario"
                component={Cadastro}
                options={{
                    title: 'Cadastro de funcionario'
                }}
            />

        </Drawer.Navigator>

    );
}