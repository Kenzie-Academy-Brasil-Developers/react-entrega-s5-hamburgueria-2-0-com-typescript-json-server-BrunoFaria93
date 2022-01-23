import {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useContext } from "react";
import { toast } from "react-toastify";

interface CartProviderProps {
  children: ReactNode;
}
interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}

interface CartContextData {
  cart: Products[];
  addToCart: (product: Products) => void;
  removeFromCart: (product: Products) => void;
  removeAllFromCart: () => void;
  totalPrice: number;
  actualProduct: Products;
  addQtd: (product: Products) => void;
  removeQtd: (product: Products) => void;
  newCart: Products[];
}

export const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const retrivedProduct = localStorage.getItem("@Kenzieshop:cart")
    ? JSON.parse(localStorage.getItem("@Kenzieshop:cart") || "")
    : [];
  const retrivedPrice = localStorage.getItem("@Kenzieshop:price")
    ? JSON.parse(localStorage.getItem("@Kenzieshop:price") || "")
    : [];
  const retrivedActual = localStorage.getItem("@Kenzieshop:actualProduct")
    ? JSON.parse(localStorage.getItem("@Kenzieshop:actualProduct") || "")
    : [];

  const [cart, setCart] = useState<Products[]>(retrivedProduct || []);

  const [totalPrice, setTotalPrice] = useState<number>(
    Number(retrivedPrice || 0)
  );
  const [actualProduct, setActualProduct] = useState<Products>(
    retrivedActual || {}
  );

  const [qtdHamb, setQtdHamb] = useState<number>(0);
  const [qtdXburg, setQtdXburg] = useState<number>(0);
  const [qtdBigK, setQtdBigK] = useState<number>(0);
  const [qtdCombo, setQtdCombo] = useState<number>(0);
  const [qtdGuarana, setQtdGuarana] = useState<number>(0);
  const [qtdCoca, setQtdCoca] = useState<number>(0);
  const [qtdOvom, setQtdOvom] = useState<number>(0);
  const [qtdBaunilha, setQtdBaunilha] = useState<number>(0);

  const retrivedProductNew = localStorage.getItem("@Kenzieshop:newCart")
    ? JSON.parse(localStorage.getItem("@Kenzieshop:newCart") || "")
    : [];

  const [newCart, setNewCart] = useState<Products[]>(retrivedProductNew || []);

  useEffect(() => {
    localStorage.setItem("@Kenzieshop:cart", JSON.stringify(cart));
    localStorage.setItem("@Kenzieshop:price", JSON.stringify(totalPrice));
    localStorage.setItem(
      "@Kenzieshop:actualProduct",
      JSON.stringify(actualProduct)
    );
    localStorage.setItem("@Kenzieshop:newCart", JSON.stringify(newCart));
  }, [cart, totalPrice, actualProduct, newCart]);

  const addToCart = (product: Products) => {
    // auxiliar = [...cart, product];
    // localStorage.setItem("@Kenzieshop:cart", JSON.stringify(auxiliar));
    setCart([...cart, product]);
    setActualProduct(product);
    setTotalPrice(totalPrice + product.price);
    toast.success(`${product.title} adicionado ao carrinho!`);
  };

  const addQtd = (product: Products) => {
    if (product.title === "Hamburguer") {
      setQtdHamb(qtdHamb + 1);
      if (qtdHamb === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "X-Burguer") {
      setQtdXburg(qtdXburg + 1);
      if (qtdXburg === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "Big Kenzie") {
      setQtdBigK(qtdBigK + 1);
      if (qtdBigK === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "Combo Kenzie") {
      setQtdGuarana(qtdGuarana + 1);
      if (qtdGuarana === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "Fanta Guaraná") {
      setQtdCombo(qtdCombo + 1);
      if (qtdGuarana === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "Coca cola") {
      setQtdCoca(qtdCoca + 1);
      if (qtdCoca === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "McShake Ovomaltine") {
      setQtdOvom(qtdOvom + 1);
      if (qtdOvom === 0) {
        setNewCart([...newCart, product]);
      }
    }
    if (product.title === "McShake Baunilha") {
      setQtdBaunilha(qtdBaunilha + 1);
      if (qtdBaunilha === 0) {
        setNewCart([...newCart, product]);
      }
    }
  };

  const removeQtd = (product: Products) => {
    if (product.title === "Hamburguer") {
      if (qtdHamb >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdHamb(qtdHamb - 1);
      }
    }
    if (product.title === "X-Burguer") {
      if (qtdXburg >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdXburg(qtdXburg - 1);
      }
    }
    if (product.title === "Big Kenzie") {
      if (qtdBigK >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdBigK(qtdBigK - 1);
      }
    }
    if (product.title === "Combo Kenzie") {
      if (qtdCombo >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdCombo(qtdCombo - 1);
      }
    }
    if (product.title === "Fanta Guaraná") {
      if (qtdGuarana >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdGuarana(qtdGuarana - 1);
      }
    }
    if (product.title === "Coca Cola") {
      if (qtdCoca >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdCoca(qtdCoca - 1);
      }
    }
    if (product.title === "McShake Ovomaltine") {
      if (qtdOvom >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdOvom(qtdOvom - 1);
      }
    }
    if (product.title === "McShake Baunilha") {
      if (qtdBaunilha >= 1) {
        setTotalPrice(totalPrice - product.price);
        setQtdBaunilha(qtdBaunilha - 1);
      }
    }
  };
  const removeFromCart = (product: Products) => {
    const newCart = cart.filter(
      (itemOnCart) => itemOnCart.productId !== product.productId
    );
    const newCart2 = cart.filter(
      (itemOnCart2) => itemOnCart2.productId !== product.productId
    );
    setCart(newCart);
    setNewCart(newCart2);
    const qtd = 0;

    if (product.title === "Hamburguer") {
      setTotalPrice(totalPrice - qtdHamb * product.price);
      setQtdHamb(0);
    }
    if (product.title === "X-Burguer") {
      setTotalPrice(totalPrice - qtdXburg * product.price);
      setQtdXburg(0);
    }
    if (product.title === "Big Kenzie") {
      setTotalPrice(totalPrice - qtdBigK * product.price);
      setQtdBigK(0);
    }
    if (product.title === "Combo Kenzie") {
      setTotalPrice(totalPrice - qtdCombo * product.price);
      setQtdCombo(0);
    }
    if (product.title === "Fanta Guaraná") {
      setTotalPrice(totalPrice - qtdGuarana * product.price);
      setQtdGuarana(0);
    }
    if (product.title === "Coca Cola") {
      setTotalPrice(totalPrice - qtdCoca * product.price);
      setQtdCoca(0);
    }
    if (product.title === "McShake Ovomaltine") {
      setTotalPrice(totalPrice - qtdOvom * product.price);
      setQtdOvom(0);
    }
    if (product.title === "McShake Baunilha") {
      setTotalPrice(totalPrice - qtdBaunilha * product.price);
      setQtdBaunilha(0);
    }
  };
  const removeAllFromCart = () => {
    setCart([]);
    setNewCart([]);
    setTotalPrice(0);
    setQtdBaunilha(0);
    setQtdHamb(0);
    setQtdXburg(0);
    setQtdCombo(0);
    setQtdBigK(0);
    setQtdGuarana(0);
    setQtdCoca(0);
    setQtdOvom(0);
    setQtdBaunilha(0);
  };
  return (
    <CartContext.Provider
      value={{
        removeAllFromCart,
        cart,
        addToCart,
        removeFromCart,
        totalPrice,
        actualProduct,
        addQtd,
        newCart,
        removeQtd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export { CartProvider, useCart };
