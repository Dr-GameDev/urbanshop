"use client";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useStateContext } from "@/context/StateContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import Cart from "./Cart";
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isMobileView, setIsMobileView] = useState(false);
    const toggleMenu = () => setIsMobileView(!isMobileView);

    const { totalQuantity, totalPrice, setTotalQuantity, setTotalPrice, setQty, setCartItems } = useStateContext();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleCheckout = () => {
        toast.success("You have successfully made your purchase!");

        // Clear the cart
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantity(0);
    };

    return (
        <nav className="sticky md:flex items-center justify-between py-6 md:gap-[11rem] lg:gap-[20rem] md:px-10 bg-[#fcfeff]">
            {/* Logo */}
            <div className="pl-5 justify-between flex">
                {/* Hamburger menu button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 10a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <a href="/" className="flex flex-col self-center font-bold text-center text-lg md:text-medium">URBANSHOP</a>

                <Button onPress={onOpen} className="cart-icon p-0 m-0 md:hidden">
                    <IoCartOutline size={30} />
                    <span className="absolute text-sm bg-green-700 text-white rounded-full w-5 h-5 bottom-4 right-5 align-middle text-center">{totalQuantity}</span>
                </Button>
            </div>


            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-x-hidden w-screen h-screen bg-[#fcfeff] justify-start transition-all duration-300 ease-in-out ${isMobileView ? "flex" : "hidden"}`}
            >
                <div className="flex flex-col gap-10 px-4 py-8 text-left items-center">
                    <a href="/store">Store</a>
                    <a href="#">About</a>
                    <a href="#">Blog</a>

                </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex gap-10">
                <a href="/store">Store</a>
                <a href="#">About</a>
                <a href="#">Blog</a>
            </div>
            <div className="hidden md:flex items-center gap-2">
                <Button onPress={onOpen} className="cart-icon">
                    <IoCartOutline size={32} />
                    <span className="relative text-sm bg-green-700 text-white rounded-full w-5 h-5 bottom-2 right-5 align-middle text-center">{totalQuantity}</span>
                </Button>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto" size="3xl" scrollBehavior="outside">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex items-center gap-1 text-lg">Cart <span className="text-small text-red-700">({totalQuantity} items)</span></ModalHeader>
                                <ModalBody className="flex flex-col">
                                    <hr />
                                    <Cart />
                                    <hr />
                                </ModalBody>
                                <ModalFooter className="flex">
                                    {totalQuantity !== 0 ? <div className="flex justify-between items-center gap-6">
                                        <div className="text-lg">Total: R{totalPrice}</div>

                                        <Button color="primary" onPress={
                                            handleCheckout

                                        } className="bg-red-600">
                                            Checkout
                                        </Button>
                                    </div>
                                        :
                                        <Button color="primary" onPress={onClose} className="bg-red-600">
                                            Continue Shopping
                                        </Button>}
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

            </div>
        </nav>

    );
};


export default Navbar;