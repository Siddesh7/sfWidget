import { useState } from "react";
import { useAccount } from "wagmi";
import { getChainName } from "../utils/getChainName";
import { getSuperToken } from "../utils/getSuperToken";

const SimpleForm = () => {
  const { address } = useAccount();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([
    {
      chainId: "",
      receiverAddress: address,
      superToken: {
        address: "",
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    },
  ]);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data object to be sent
    const formData = {
      itemDetail: {
        name,
        description,
        paymentOptions,
      },
    };

    // Here, you can send the formData object to your backend or perform any other action
    console.log(formData);
  };

  // Function to add a new payment option to the array
  const addPaymentOption = () => {
    setPaymentOptions((prevPaymentOptions) => [
      ...prevPaymentOptions,
      {
        chainId: "",
        receiverAddress: address,
        superToken: {
          address: "",
        },
        flowRate: {
          amountEther: "",
          period: "month",
        },
      },
    ]);
  };

  // Function to update a payment option's property
  const updatePaymentOption = (index, field, value) => {
    setPaymentOptions((prevPaymentOptions) => {
      const updatedOptions = [...prevPaymentOptions];
      updatedOptions[index][field] = value;
      return updatedOptions;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-lg w-[90%] m-auto my-[40px] md:w-[60%]"
    >
      <div className="relative">
        {showPaymentDetails && (
          <button
            className="btn btn-neutral absolute left-[10px] top-[10px]"
            onClick={() => {
              setShowPaymentDetails(false);
            }}
          >
            {"<"}
          </button>
        )}
        {!showPaymentDetails && (
          <button
            className="btn btn-neutral absolute right-[10px] top-[10px]"
            onClick={() => {
              setShowPaymentDetails(true);
            }}
          >
            {">"}
          </button>
        )}
      </div>
      {!showPaymentDetails && (
        <div className="my-[40px]">
          <div className="flex flex-start mb-4 w-[90%] m-auto text-xl">
            Please enter a name and description for this subscription.
          </div>
          <div className="mb-4 w-[80%] m-auto">
            <label
              htmlFor="name"
              className="flex flex-start text-gray-700 font-bold my-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-[80%] m-auto">
            <label
              htmlFor="description"
              className="flex flex-start text-gray-700 font-bold my-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
      {showPaymentDetails && (
        <div className="mb-4 mt-[40px] w-[90%] m-auto">
          <h3 className="text-xl font-bold mb-2">Payment Options:</h3>
          {paymentOptions.map((option, index) => (
            <div
              key={index}
              className={`mb-4 ${
                index != paymentOptions.length - 1 && `hidden`
              }`}
            >
              <label className="flex flex-start text-gray-700 font-bold my-2">
                Chain ID:
              </label>
              <select
                value={option.chainId || ""}
                onChange={(e) =>
                  updatePaymentOption(
                    index,
                    "chainId",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Chain ID</option>
                <option value="80001">Mumbai</option>
                <option value="5">Goerli</option>
              </select>

              <label className="flex flex-start text-gray-700 font-bold my-2">
                Receiver Address:
              </label>
              <input
                type="text"
                value={option.receiverAddress || ""}
                onChange={(e) =>
                  updatePaymentOption(index, "receiverAddress", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />

              <label className="flex flex-start text-gray-700 font-bold my-2">
                SuperToken Address:
              </label>
              <select
                value={option.superToken.address || ""}
                onChange={(e) =>
                  updatePaymentOption(index, "superToken", {
                    address: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select SuperToken Address</option>
                <option value="0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f">
                  fDAIx
                </option>
                <option value="0x42bb40bF79730451B11f6De1CbA222F17b87Afd7">
                  fUSDCx
                </option>
              </select>

              <label className="flex flex-start text-gray-700 font-bold my-2">
                Flow Rate (Ether):
              </label>
              <input
                type="number"
                value={option.flowRate.amountEther || ""}
                onChange={(e) =>
                  updatePaymentOption(index, "flowRate", {
                    ...option.flowRate,
                    amountEther: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
              {/* Add a dropdown or other input for the period */}
            </div>
          ))}

          <button
            type="button"
            onClick={addPaymentOption}
            className="btn btn-primary "
          >
            Add another chain/payment option
          </button>
        </div>
      )}
      {paymentOptions.length > 1 &&
        showPaymentDetails &&
        paymentOptions.map((item, index) => (
          <div key={index} className="my-[10px]">
            {item.chainId != "" && (
              <div className="collapse bg-gray-800">
                <input type="checkbox" />
                <div className="collapse-title text-md font-medium">
                  {getChainName(item.chainId)} - {item.flowRate.amountEther}
                  &nbsp;
                  {getSuperToken(item.superToken.address)}/
                  {item.flowRate.period}
                </div>

                <div className="collapse-content flex flex-col text-left">
                  <p>Flowrate: {item.flowRate.amountEther}</p>
                  <p>Receiver: {item.receiverAddress}</p>
                  <p>Supertoken: {getSuperToken(item.superToken.address)}</p>
                  <p>Chain: {getChainName(item.chainId)}</p>
                </div>
              </div>
            )}
          </div>
        ))}

      {showPaymentDetails && (
        <button type="submit" className=" btn btn-accent">
          Submit
        </button>
      )}
    </form>
  );
};

export default SimpleForm;
