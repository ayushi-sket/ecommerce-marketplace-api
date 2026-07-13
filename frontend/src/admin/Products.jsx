import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");


  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data.products);

    } catch(error) {

      console.log(error);

    }

  };


  useEffect(() => {
    fetchProducts();
  }, []);



  const deleteProduct = async(id)=>{

    try{

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchProducts();

    }catch(error){

      console.log(error);

    }

  };



  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Product Management
        </h1>


        <Link
          to="/admin/products/add"
          className="bg-purple-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </Link>

      </div>



      <div className="bg-white shadow rounded-lg overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-200">

            <tr>

              <th className="p-3 text-left">
                Image
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Stock
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>



          <tbody>


          {
            products.map((product)=>(

              <tr 
                key={product._id}
                className="border-b"
              >


                <td className="p-3">

                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/80"
                    }
                    className="w-16 h-16 object-cover rounded"
                  />

                </td>



                <td className="p-3 font-medium">
                  {product.name}
                </td>



                <td className="p-3">
                  ₹{product.price}
                </td>



                <td className="p-3">
                  {product.stock}
                </td>



                <td className="p-3 flex gap-3">


                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>



                  <button
                    onClick={()=>deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>


                </td>


              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Products;
