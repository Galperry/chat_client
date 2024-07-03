import './App.css';
import { LoginPage } from './components/LoginPage';
import { useSelector } from 'react-redux';
import { ChatPage } from './components/ChatPage';

function App() {
  const userId =
    useSelector((state) => state.user.userId) ||
    sessionStorage.getItem('userId');

  return <div className="App">{userId ? <ChatPage /> : <LoginPage />}</div>;
}

export default App;
