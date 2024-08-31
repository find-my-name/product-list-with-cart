import "./components/App.css";
import DessertContainer from "./components/DessertContainer";
import Cart from "./components/Cart";

const App = () => {
  return (
    <>
      <div className="container">
        <div>
          <h1 className="head">Desserts</h1>
          <DessertContainer />
        </div>
        <Cart />
      </div>
    </>
  );
};
export default App;
