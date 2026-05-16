import { createDrawerNavigator } from '@react-navigation/drawer';

import TelaGerente from '../Screens/Gerente/TelaGerente';
import VisualizacaoMesa from '../Screens/Gerente/VisualizacaoMesa';
import PedidoDiario from '../Screens/Gerente/PedidoDiario';
import LucroDiario from '../Screens/Gerente/LucroDiario';

const Drawer = createDrawerNavigator();

export default function GerenteNav() {

    return(

        <Drawer.Navigator>

            <Drawer.Screen
                name="Início"
                component={TelaGerente}
            />

            <Drawer.Screen
                name="Pedidos Diários"
                component={PedidoDiario}
            />

            <Drawer.Screen
                name="Lucro Diário"
                component={LucroDiario}
            />

            <Drawer.Screen
                name="Visualização das Mesas"
                component={VisualizacaoMesa}
            />

        </Drawer.Navigator>
    );
}