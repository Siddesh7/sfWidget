import { useEffect, useState } from "react";
import ClipboardCopy from "./Copy";

export default function Success({ uri }) {
  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    // Redirect to another page after 10 seconds
    const timer = setTimeout(() => {
      window.location.href = `/pay/${uri}`;
    }, 5000);

    // Clean up the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-[100vw] h-[100vh] flex items-center justify-center p-0 m-0 relative"
      style={{
        backdropFilter: "blur(100px)", // Adjust the blur amount as needed
        backgroundColor: "rgba(216, 211, 211, 0.4)", // Adjust the alpha value for transparency
      }}
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-cover bg-center"></div>

      {showSuccess && (
        <div className="card w-[40vw] h-[40vh] shadow-xl bg-base-100 rounded-lg p-8">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p>Checkout your Payment Page powered by Superfluid</p>
            <p>
              Click to copy your Link:{" "}
              {`${window.location.hostname}/pay/${uri} `}
            </p>
            <div>
              <ClipboardCopy
                copyText={`${window.location.hostname}/pay/${uri} `}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
