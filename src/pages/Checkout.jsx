import { ConnectButton } from "@rainbow-me/rainbowkit";
import superTokenList from "@superfluid-finance/tokenlist";
import { useParams } from "react-router-dom";
import SuperfluidWidget from "@superfluid-finance/widget";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Checkout() {
  const { uri } = useParams();
  const [itemNotfound, setItemNotFound] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState();
  const [productData, setProductData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getting data");
        const response = await axios.get(
          `https://sfbe.onrender.com/api/items/${uri}`
        );
        console.log(response);
        if (response.data.error) {
          console.log(response.data);
          setItemNotFound(true);
        } else {
          const paymentOptions = response.data.itemDetail.paymentOptions;
          const productData = {
            name: response.data.itemDetail.name,
            description: response.data.itemDetail.description,
          };
          const paymentData = { paymentOptions };
          setProductData(productData);
          setPaymentOptions(paymentData);
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [uri]);
  return (
    <>
      {productData && paymentOptions && (
        <ConnectButton.Custom>
          {({ openConnectModal, connectModalOpen }) => {
            const walletManager = {
              open: async () => openConnectModal(),
              isOpen: connectModalOpen,
            };
            return (
              <SuperfluidWidget
                productDetails={productData}
                paymentDetails={paymentOptions}
                tokenList={superTokenList}
                walletManager={walletManager}
                theme={{
                  typography: {
                    fontFamily: "'Noto Sans', 'sans-serif'",
                  },
                  palette: {
                    mode: "dark",
                    primary: {
                      main: "#1DB227",
                    },
                    secondary: {
                      main: "#fff",
                    },
                  },
                  shape: {
                    borderRadius: 20,
                  },
                  components: {
                    MuiStepIcon: {
                      styleOverrides: {
                        text: {
                          fill: "#fff",
                        },
                      },
                    },
                    MuiOutlinedInput: {
                      styleOverrides: {
                        root: {
                          borderRadius: 10,
                        },
                      },
                    },
                    MuiButton: {
                      styleOverrides: {
                        root: {
                          borderRadius: 10,
                        },
                      },
                    },
                  },
                }}
              ></SuperfluidWidget>
            );
          }}
        </ConnectButton.Custom>
      )}
      {itemNotfound && <h1>Wrong URL</h1>}
    </>
  );
}
