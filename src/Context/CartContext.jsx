import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const updateCartFromStorage = () => {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    };

    window.addEventListener("cartChanged", updateCartFromStorage);
    window.addEventListener("cart-updated", updateCartFromStorage);
    window.addEventListener("user-logged-in", updateCartFromStorage);
    window.addEventListener("user-logged-out", () => {
      setCartItems([]); // clear cart on logout
    });

    return () => {
      window.removeEventListener("cartChanged", updateCartFromStorage);
      window.removeEventListener("cart-updated", updateCartFromStorage);
      window.removeEventListener("user-logged-in", updateCartFromStorage);
      window.removeEventListener("user-logged-out", () => setCartItems([]));
    };
  }, []);


  const syncCartWithServer = async (cartDataToSend) => {
    const storedUserString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUserString || !token) {
      return;
    }

    try {
      const storedUser = JSON.parse(storedUserString);

      if (!storedUser.user_id) {
        throw new Error("User ID not found in local storage.");
      }

      const transformedCartData = cartDataToSend.map(item => ({
        ...item,
        id: parseInt(item.id, 10),
        final_price: parseFloat(item.final_price || item.price),
        price: parseFloat(item.price),
        discount: String(item.discount),
        vendor_id: parseInt(item.vendor_id, 10),
        quantity: parseInt(item.quantity, 10)
      }));

      const payload = {
        user_id: storedUser.user_id,
        cart_data: transformedCartData
      };

      await fetch("https://cords.tranktechnologies.com/api/save-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

    } catch (err) {
      console.error("Cart sync failed:", err);
      toast.error("Could not sync your cart changes.");
    }
  };



  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.final_price || item.price) * item.quantity, 0);
  }, [cartItems]);

  const gstAmount = useMemo(() => subtotal * 0.18, [subtotal]);
  const shipping = 0;
  const totalBeforeDiscount = subtotal + gstAmount + shipping;
  const finalTotal = Math.max(totalBeforeDiscount - discount, 0);


  // --- Cart Functions ---
  const addToCart = (product) => {
    let newCartItems;
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      const incomingQty = product.quantity || 1;

      if (exists) {
        newCartItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + incomingQty }
            : item
        );
      } else {
        newCartItems = [...prevItems, { ...product, quantity: incomingQty }];
      }

      // Sync this new state with the server
      syncCartWithServer(newCartItems);
      return newCartItems; // Return the new state
    });
  };

  const removeFromCart = (id) => {
    // First, calculate the new cart state by filtering out the item
    const newCartItems = cartItems.filter((item) => item.id !== id);

    // Then, update the local React state. This will trigger the useEffect
    // to update localStorage automatically.
    setCartItems(newCartItems);

    // Finally, send the newly updated cart array to the server.
    syncCartWithServer(newCartItems);
    toast.info("Item removed from cart.");
  };

  const updateQuantity = (id, amount) => {
    // Calculate the new cart state with the updated quantity
    const newCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );

    // Update the local state, which in turn updates localStorage via useEffect
    setCartItems(newCartItems);

    // Send the updated cart array to the server
    syncCartWithServer(newCartItems);
  };

  const cartCount = cartItems.length;


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        subtotal,
        gstAmount,
        shipping,
        totalBeforeDiscount,
        finalTotal,
        discount,
        setDiscount,
        promoCode,
        setPromoCode,
        error,
        setError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);