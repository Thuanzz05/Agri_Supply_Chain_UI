import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import HomePage from './pages/HomePage';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <HomePage />
    </ConfigProvider>
  );
}

export default App;
