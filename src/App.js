
import './App.css';
import store from '../src/Redux/Store/index';
import { Provider } from "react-redux";

function App() {
  return (
    <div className="wrapper">

      <p>
	      {process.env.BASE_URL}
        {process.env.REACT_APP_API_KEY}

      </p>
    </div>
  );
}

export default ()=>{
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
};
