import { Provider as PaperProvider } from 'react-native-paper';
import EscolhaLogin from './assets/Login/EscolhaLogin';
import TelaInicial from './assets/Login/TelaInicial';


export default function App() {
  return (
    <PaperProvider>
      <TelaInicial/>
    </PaperProvider>
  );
}