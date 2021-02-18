import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
    const total = order.reduce((acc, singleItem) => {
        const pizza = pizzas.find(
            (singlePizza) => singlePizza.id === singleItem.id
        );
        return acc + calculatePizzaPrice(pizza.price, singleItem.size);
    }, 0);

    return total;
}
