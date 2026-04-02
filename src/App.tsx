import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viVN from 'antd/locale/vi_VN';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Dashboard from './pages/admin/Dashboard';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
