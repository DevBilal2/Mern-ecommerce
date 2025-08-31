import AppRoutes from "./routes/Approutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, selectCurrentUser } from "./Store/Slices/userSlice";
import { fetchLikedProducts } from "./Store/Slices/likedProductSlice";
import { fetchProducts } from "./Store/ApiCalls";
import { fetchCart } from "./Store/Slices/cartSlice";
import { fetchAddresses } from "./Store/Slices/address";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // Always fetch public data and current user
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // Only fetch protected data when logged in
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart());
      dispatch(fetchAddresses());
      dispatch(fetchLikedProducts());      
    }
  }, [dispatch, currentUser]);

  return <AppRoutes />;
}

export default App;
