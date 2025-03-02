import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold mt-20">🛒 Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-lg mt-5">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => {
                            const imageUrl = item.imageUrl || "https://via.placeholder.com/100";

                            return (
                                <li key={item.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-md bg-white">
                                    <Link to={`/product/${item.id}`} className="flex items-center gap-4">
                                        <img 
                                            src={imageUrl} 
                                            alt={item.title} 
                                            className="w-16 h-16 object-contain rounded"
                                            onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
                                        />
                                    </Link>
                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg">{item.title}</h2>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                        <h3 className="text-lg font-bold">₹{item.price}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 px-2 py-1 rounded">-</button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 px-2 py-1 rounded">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">❌ Remove</button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h2>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;
