import MainApp from './component/MainApp'
import AppProvider from './context/AppProvider'
import './App.scss';

function App() {
  return (
    <div className="container">
      <div className="header"></div>
      <div className="mainbody">
        <AppProvider>
          <MainApp />
        </AppProvider>
      </div>
    </div>
  );
}

export default App;
