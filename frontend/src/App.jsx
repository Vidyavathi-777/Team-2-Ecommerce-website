import React from "react";
import { Routes, Route } from "react-router-dom";
import MainComponent from "./homepage";
import Wishlist from "./wishlist";
import Cart from "./cart";
import Navbar from "./Navbar"; // Navbar will always be visible
import ProductOverview from "./overview"; // Import ProductOverview page

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainComponent />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductOverview />} /> 
                {/* ✅ Added ProductOverview route */}
                {/* <Route path="/product/:title" element={<ProductOverview />} /> */}

            </Routes>
        </>
    );
}

export default App;
