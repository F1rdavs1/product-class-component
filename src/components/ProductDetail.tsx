import { Component } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { LeftIcon } from '../fonts/icon';

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
}

interface State {
  product: Product | null;
}

class AboutProduct extends Component<{ id: string }, State> {
  state: State = {
    product: null,
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = () => {
    const { id } = this.props; 
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        this.setState({ product: response.data });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }

  render() {
    const { product } = this.state;

    if (!product) return <div className="text-center">Loading...</div>;

    return (
      <div className="container mx-auto p-5">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[400px] mx-auto border-[red] border-[1px]">
          <img 
            className="w-full h-96 object-cover" 
            src={product.thumbnail} 
            alt={product.title} width={250} height={250} 
          />
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <h1 className="text-3xl font-bold mb-2">{product.price}</h1>
            <NavLink to="/">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                <LeftIcon/>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const ProductDetail = (props: any) => {
  const params = useParams();
  return <AboutProduct {...props} id={params.id} />;
};

export default ProductDetail;
