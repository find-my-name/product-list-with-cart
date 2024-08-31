import Dessert from "./Dessert";
import desserts from "./data.json";

const DessertContainer = () => {
  return (
    <div className="dessert-container">
      {desserts.map((dessert, index) => (
        <Dessert
          key={index}
          name={dessert.name}
          category={dessert.category}
          price={dessert.price}
          imageUrl={dessert.image}
        />
      ))}
    </div>
  );
};
export default DessertContainer;
