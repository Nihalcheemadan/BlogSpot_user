import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../utils/baseUrl";

function Payments() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  return (
    <div className="bg-no-repeat bg-cover bg-center relative bg-[url('https://images.pexels.com/photos/768472/pexels-photo-768472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <Toaster position="top-center"></Toaster>
      <section className=" py-8">
      <div class="hidden sm:block absolute bg-green-500/20 inset-0 z-0 "></div>
        <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Pricing
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
            <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none  bg-white lg:rounded-l-lg mt-4">
              <div className="flex-1  text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
                <div className="p-8 text-3xl font-bold text-center border-b-4">
                  Free
                </div>
                <ul className="w-full text-center text-xl">
                  <li className="border-b py-4">LIMITED CONNECTIONS</li>
                  <li className="border-b py-4">LIMITED CONTENTS </li>
                  {/* <li className="border-b py-4">Thing</li> */}
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
                  $ 0<span className="text-base">for one user</span>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => navigate("/userProfile")}
                    className="mx-auto lg:mx-0 hover:bg-blend-color gradient text-slate-900 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <div className="w-full p-8 text-3xl font-bold text-center">
                  Premium
                </div>
                <hr />
                <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                <ul className="w-full text-center text-base font-bold">
                  <li className="border-b py-4">UNLIMITED CONTENTS</li>
                  <li className="border-b py-4">UNLIMITED CONNECTIONS</li>
                  <li className="border-b py-4">PRIME MEMBER</li>
                  {/* <li className="border-b py-4">Thing</li> */}
                </ul>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                <div className="w-full pt-6 text-4xl font-bold text-center">
                  $ 10
                  <span className="text-base">/ per user</span>
                </div>
                <div className="flex items-center justify-center">
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AdCkFi588MRP8XjxQUdD43ALiuIeoG25Qhba5b22uPTaqQE_rSgwrBsX-GBcUVi8Q-N8u_IbpzPQy0lw",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "10",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const { orderID } = data;
                        if (orderID) {
                          instance
                            .post(
                              `/user/premiumUser`,
                              {},
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            )
                            .then((res) => {
                              toast.success("payment succes");
                              navigate("/userProfile");
                            });
                        } else {
                          console.log("payment error");
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payments;
