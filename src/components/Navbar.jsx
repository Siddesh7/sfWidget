import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-2xl"
          onClick={() => {
            window.location.href = `/`;
          }}
        >
          xPayU
        </a>
      </div>
      <div className="flex-none">
        <ConnectButton />
      </div>
    </div>
  );
}
