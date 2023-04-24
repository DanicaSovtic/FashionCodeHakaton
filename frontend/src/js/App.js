import "../css/App.css";
import Main from './Main';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./home";
import MainManufacturer from "./MainManufacturer";
//import "../css/home.css";



function App() {
 

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/mainManufacturer" element={<MainManufacturer />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;