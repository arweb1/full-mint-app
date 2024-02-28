import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/header/Header";
import Notifications from "./components/notifications/Notifications";

import './styles/styles.scss'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Notifications/>
      </div>
    </Provider>
  );
}

export default App;
