import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DarkMode, LightMode } from "../fonts/icon";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface State {
  products: Product[];
  isLightMode: boolean;
}

class ProductList extends Component<{}, State> {
  state: State = {
    products: [],
    isLightMode: true,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        this.setState({ products: response.data.products });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  toggleMode = () => {
    this.setState((prevState) => ({
      isLightMode: !prevState.isLightMode,
    }));
  };

  render() {
    const { products, isLightMode } = this.state;
    const backgroundColor = isLightMode ? "bg-[#E9E9E9]" : "bg-[#212121]";
    const CardTextColor = isLightMode ? "text-[black]" : "text-[white]";
    const borderColor = isLightMode ? "border-[grey]" : "border-[white]";
    const productContainerBg = isLightMode ? "bg-[white]" : "bg-[#4F4F4F]";
    const productCardBg = isLightMode ? "bg-[#E9E9E9]" : "bg-[#212121]";

    return (
      <div className={`mx-auto ${backgroundColor} min-h-screen`}>
        <div
          className={`flex items-center justify-center border-b-[4px] py-[10px] ${borderColor}`}
        >
          <h1 className={`text-3xl font-bold text-center ${CardTextColor}`}>
            Product List
          </h1>
          <button
            onClick={this.toggleMode}
            className="ml-4 px-4 py-2  text-black rounded  transition duration-300"
          >
            {isLightMode ? <DarkMode /> : <LightMode />}
          </button>
        </div>
        <div
          className={`flex flex-wrap space-y-2 ${productContainerBg} p-[10px] bg-[#E9E9E9]`}
        >
          {products.map((product) => (
            <div
              className={` shadow-lg rounded-lg border border-black w-[230px] mx-auto hover:scale-105 duration-300 hover:border-[red] ${productCardBg}`}
              key={product.id}
            >
              <img
                className="w-full p-4 object-contain"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="p-4">
                <h2 className={`text-xl font-semibold mb-2 ${CardTextColor}`}>
                  {product.title}
                </h2>
                <p className={`text-gray-600 text-sm mb-4 ${CardTextColor}`}>
                  {product.description.substring(0, 20)}...
                </p>
                <Link to={`/product/${product.id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                    See more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
