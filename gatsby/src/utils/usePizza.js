import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
    // create state to hold our order
    // commented following line because useState was moved up to the provider
    // const [order, setOrder] = useState([]);
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
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
    async function submitOrder(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            mapleSyrup: values.mapleSyrup,
        };
        // send this data to a serverless function when they check out
        const res = await fetch(
            `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );
        const text = JSON.parse(await res.text());
        // check if everything worked
        if (res.status >= 400 && res.status < 600) {
            setLoading(false); // turn off loading
            setError(text.message);
        } else {
            setLoading(false);
            setMessage('Success! Come on down for you pizza.');
        }
    }

    return {
        order,
        addToOrder,
        removeFromOrder,
        submitOrder,
        error,
        loading,
        message,
    };
}
