import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/header/Header";
import ConnectWallet from "./features/wallet-components/ConnectWallet";

import './styles/styles.scss'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <ConnectWallet/>
      </div>
    </Provider>
  );
}

export default App;
