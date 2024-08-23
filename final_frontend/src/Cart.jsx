import React from 'react';
import { useCart } from './CartContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const { cartItems, setCartItems } = useCart();
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const updateQuantity = (item, delta) => {
        setCartItems(prevItems => {
            const newItems = prevItems.map(i => {
                if (i.title === item.title) {
                    return { ...i, quantity: Math.max(0, i.quantity + delta) };
                }
                return i;
            });
            return newItems.filter(i => i.quantity > 0);
        });
    };

    const handleClearCart = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, clear it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete('http://127.0.0.1:8000/api/cart', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setCartItems([]);
                } catch (error) {
                    Swal.fire('Error', 'There was an error clearing your cart.', 'error');
                }
            }
        });
    };

    const handleRemoveItem = async (item) => {
        if (!item.id) {
            Swal.fire('Error', 'Product ID is missing for the item.', 'error');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to remove ${item.title} from the cart?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/cart/item/${item.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setCartItems(prevItems => prevItems.filter(i => i.id !== item.id));

                    Swal.fire('Removed!', `${item.title} has been removed from your cart.`, 'success');
                } catch (error) {
                    Swal.fire('Error', 'There was an error removing the item from your cart.', 'error');
                }
            }
        });
    };

    const handleProceedToCheckout = async () => {
        try {
            const itemsToUpdate = cartItems.map(item => {
                if (!item.id) {
                    Swal.fire('Error', 'Product ID is missing for some items.', 'error');
                    return null;
                }
                return {
                    product_id: item.id,
                    quantity: item.quantity
                };
            }).filter(Boolean);

            if (itemsToUpdate.length === 0) {
                Swal.fire('Error', 'No valid items to update in the cart.', 'error');
                return;
            }

            await axios.post('http://127.0.0.1:8000/api/cart/update', {
                items: itemsToUpdate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await axios.post('http://127.0.0.1:8000/api/cart/checkout', {
                items: itemsToUpdate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/checkout');
        } catch (error) {
            Swal.fire('Error', 'There was an error processing your checkout.', 'error');
        }
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className='p-4'>
            <div className="p-4 text[#093a74] rounded-lg border-2 border-[#093a74]">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex items-center border-b border-[#093a74]/40 py-2">
                                    {item.image_path && (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${item.image_path}`}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover mr-4 rounded"
                                        />
                                    )}
                                    <div className="flex-grow flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <h2 className="text-xl font-bold">{item.title}</h2>
                                            <p className="text-lg">Price: ${item.price}</p>
                                            <div className="flex items-center mt-1">
                                                <button
                                                    onClick={() => updateQuantity(item, -1)}
                                                    className="px-2 py-0.5 border bg-[#093a74]"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item, 1)}
                                                    className="px-2 py-0.5 border bg-[#093a74]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.2" stroke="#093a74" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 7l16 0" />
                                                <path d="M10 11l0 6" />
                                                <path d="M14 11l0 6" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleClearCart}
                                className="flex items-center text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.2" stroke="#093a74" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                                <span className="ml-2 text-red-500 text-sm font-semibold">
                                    Clear Cart
                                </span>
                            </button>
                            <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="mt-6">
                            <button
                                className="w-full bg-[#6dad63] hover:bg-[#539748] text-white px-4 py-2 rounded font-semibold text-lg"
                                onClick={handleProceedToCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
