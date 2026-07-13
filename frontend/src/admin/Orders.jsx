import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");


  const fetchOrders = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setOrders(res.data.orders);

    } catch(error){
      console.log(error);
    }
  };


  useEffect(()=>{
    fetchOrders();
  },[]);



  const updateStatus = async(id,status)=>{

    try{

      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          status
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchOrders();

    }catch(error){
      console.log(error);
    }

  };



  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <h1 className="text-3xl font-bold mb-8">
        Order Management
      </h1>



      <div className="bg-white shadow rounded-xl overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Products
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>

          </thead>



          <tbody>


          {
            orders.map((order)=>(


              <tr 
                key={order._id}
                className="border-b hover:bg-gray-50"
              >


                <td className="p-4">

                  <p className="font-semibold">
                    {order.user?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.user?.email}
                  </p>

                </td>



                <td className="p-4">

                  {
                    order.items.map(item=>(

                      <div key={item._id}>

                        {item.product?.name}
                        {" "} 
                        x {item.quantity}

                      </div>

                    ))
                  }

                </td>



                <td className="p-4 font-semibold">
                  ₹{order.totalAmount}
                </td>



                <td className="p-4">


                  <select

                    value={order.status}

                    onChange={(e)=>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }

                    className="border rounded-lg px-3 py-2"

                  >

                    <option>
                      Pending
                    </option>

                    <option>
                      Processing
                    </option>

                    <option>
                      Shipped
                    </option>

                    <option>
                      Delivered
                    </option>

                    <option>
                      Cancelled
                    </option>


                  </select>


                </td>



                <td className="p-4 text-gray-600">

                  {new Date(order.createdAt)
                    .toLocaleDateString()
                  }

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


export default Orders;

