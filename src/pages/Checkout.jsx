import { ConnectButton } from "@rainbow-me/rainbowkit";
import superTokenList from "@superfluid-finance/tokenlist";
import { useParams } from "react-router-dom";
import SuperfluidWidget from "@superfluid-finance/widget";
import data from "../widget.json";
import { paymentDetails, productDetails } from "../p";
export default function Checkout() {
  const { uri } = useParams();
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, connectModalOpen }) => {
        const walletManager = {
          open: async () => openConnectModal(),
          isOpen: connectModalOpen,
        };
        return (
          <>
            <SuperfluidWidget
              productDetails={productDetails}
              paymentDetails={paymentDetails}
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
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}
