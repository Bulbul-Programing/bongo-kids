import Banner from "./Banner/Banner";
import NewArrivals from "./NewArrivals/NewArrivals";
import SelectedProduct from "./SelectedProduct/SelectedProduct";

const Home = () => {
  
  return (
    <div>
      <Banner></Banner>
      <SelectedProduct></SelectedProduct>
      <NewArrivals></NewArrivals>
    </div>
  );
};

export default Home;