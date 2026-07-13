import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/products?search=${search}`
        );

        setProducts(res.data.products);


      } catch(err){

        console.log(err);
        setError("Failed to load products");


      } finally {

        setLoading(false);

      }

    };


    fetchProducts();


  }, [search]);





  const handleAddToCart = async(productId)=>{

    if(!token){

      setMessage("Please login to add items");
      return;

    }


    try{

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity:1
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setMessage("Added to cart!");

    }
    catch(err){

      setMessage(
        err.response?.data?.message ||
        "Failed to add cart"
      );

    }


    setTimeout(()=>{
      setMessage("");
    },2000);

  };





  if(loading)
    return <p className="text-center mt-20">Loading products...</p>;


  if(error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;





  return (

    <div className="min-h-screen bg-gray-50 px-8 py-12">


      <h1 className="text-3xl font-bold text-center mb-5">
        Our Products
      </h1>


      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="block mx-auto mb-8 w-full max-w-md border rounded-lg px-4 py-3"
      />



      {
        message &&
        <p className="text-center text-purple-600 mb-5">
          {message}
        </p>
      }




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">


        {
          products.length > 0 ? (

          products.map((product)=>(

            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition"
            >


              <Link to={`/products/${product._id}`}>

                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />


                <h2 className="text-lg font-semibold hover:text-purple-600">
                  {product.name}
                </h2>


              </Link>


              <p className="text-purple-600 font-bold mt-2">
                ₹{product.price}
              </p>



              <button
                onClick={()=>handleAddToCart(product._id)}
                className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
              >
                Add to Cart
              </button>


            </div>

          ))

          ) : (

            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>

          )
        }


      </div>


    </div>

  );
}


export default Products;
