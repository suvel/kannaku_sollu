import MainApp from './component/MainApp'
import AppProvider from './context/AppProvider'
import './App.scss';

function App() {
  return (
    <div class="container">
      <div class="header"></div>
      <div class="mainbody">
        <AppProvider>
          <MainApp />
        </AppProvider>
      </div>
    </div>
  );
}

export default App;
