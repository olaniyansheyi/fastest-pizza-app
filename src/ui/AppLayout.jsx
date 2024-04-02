import Cart from "../features/cart/Cart";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <h1>content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
