import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");


  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(res.data.product);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };


    fetchProduct();

  }, [id]);



  const handleAddToCart = async () => {

    if (!token) {
      setMessage("Please login first");
      return;
    }


    try {

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: id,
          quantity: 1
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setMessage("Added to cart!");

    } catch(error){

      setMessage(
        error.response?.data?.message || "Failed"
      );

    }

  };



  if(loading){
    return <p className="text-center mt-20">Loading...</p>
  }


  if(!product){
    return <p className="text-center mt-20">Product not found</p>
  }



  return (

    <div className="min-h-screen bg-gray-50 px-8 py-12">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 grid md:grid-cols-2 gap-8">


        <img
          src={
            product.image ||
            "https://via.placeholder.com/400"
          }
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />


        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>


          <p className="text-purple-600 text-2xl font-bold mt-4">
            ₹{product.price}
          </p>


          <p className="text-gray-600 mt-5">
            {product.description || "No description available"}
          </p>


          <button
            onClick={handleAddToCart}
            className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Add to Cart
          </button>


          {message && (
            <p className="mt-4 text-purple-600">
              {message}
            </p>
          )}

        </div>


      </div>

    </div>

  );
}


export default ProductDetails;
