import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
    // create state to hold our order
    // commented following line because useState was moved up to the provider
    // const [order, setOrder] = useState([]);
    const [order, setOrder] = useContext(OrderContext);
    // make a function to add things to order
    function addToOrder(orderedPizza) {
        setOrder([...order, orderedPizza]);
    }
    // make a function to remove things from the order
    function removeFromOrder(index) {
        setOrder([
            // everything before the item we want to remove
            ...order.slice(0, index),
            // everything after the item we want to remove
            ...order.slice(index + 1),
        ]);
    }
    // send this data to a serverless function when they check out

    return {
        order,
        addToOrder,
        removeFromOrder,
    };
}
