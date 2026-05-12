import { Provider as PaperProvider } from 'react-native-paper';
import TelaInicial from './Restaurante/TelaInicial';

export default function App() {
  return (
    <PaperProvider>
      <TelaInicial />
    </PaperProvider>
  );
}