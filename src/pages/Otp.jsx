import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../helpers/helper";
import instance from "../utils/baseUrl";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const [counter, setCounter] = useState(60);
  const navigate = useNavigate();
  const data = location.state?.data;
  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOTP(otp, data)
      .then((res) => {
        toast.success("Verification successfull");
        navigate("/login", { replace: "true" });
      })
      .catch(() => {
        toast.error("invalid OTP.");
      });
  };

  const resendOtp = async (e) => {
    let {
      data: { code },
    } = await instance.get("/user/generateOtp");
    if (code) {
      let text = `Your new otp is ${code}. Verify and signup.`;
      await instance.post("/user/createMail", {
        username: data.username,
        userEmail: data.email,
        text,
        subject: "Resend OTP",
      });
    }
    toast.success("OTP resent successfully.");
    setCounter(60).catch(() => {
      toast.error("Oops, something went wrong!");
    });
  };
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtp((prevOtp) => {
      const otpArr = prevOtp.split(""); // convert the previous value to an array
      otpArr[name] = value; // set the value of the input field at the specified index
      return otpArr.join(""); // join the array elements into a string and return it
    });
  };

  return (
    <div
      class="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/768472/pexels-photo-768472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div class="hidden sm:block absolute bg-green-500/20 inset-0 z-0 "></div>
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {data.email}</p>
            </div>
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div class="flex flex-col space-y-16">
                <div class=" gap-1 flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {[...Array(6)].map((_, index) => (
                    <div class="w-16 h-16 " key={index}>
                      <input
                        onChange={handleInputChange}
                        value={otp[index] || ""}
                        class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name={index}
                        maxLength={1}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div class="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={(e) => handleSubmit(e)}
                      type="submit"
                      class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    {counter ? (
                      <p className="text-xs mt-4 mb-1 text-lightBlue">
                        Timer: {counter} Sec
                      </p>
                    ) : (
                      <p className="text-xs mt-4 mb-1 text-lightBlue">
                        Didn't recieve code?{" "}
                        <button
                          className="inline-block ml-1 text-blue-600"
                          onClick={(e) => resendOtp(e)}
                        >
                          Resend
                        </button>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
