import Home from "./Components/home/Home";
import Header from "./Components/header/Header";
import Cart from "./Components/cart/Cart"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store  from './redux/store'
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div> 
      </Provider>
    </BrowserRouter>
  );
}

export default App;
