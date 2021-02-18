import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import Orderstyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
    const { values, updateValue } = useForm({
        name: '',
        email: '',
    });
    const pizzas = data.pizzas.nodes;
    const { order, addToOrder, removeFromOrder } = usePizza({
        pizzas,
        inputs: values,
    });
    return (
        <>
            <SEO title="Order a pizza" />
            <Orderstyles>
                <fieldset>
                    <legend>Your Info</legend>
                    <label htmlFor="name">
                        Name
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={updateValue}
                        />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={updateValue}
                        />
                    </label>
                </fieldset>
                <fieldset className="menu">
                    <legend>Menu</legend>
                    {pizzas.map((pizza, i) => (
                        <MenuItemStyles key={i}>
                            <Img
                                width="50"
                                height="50"
                                fluid={pizza.image.asset.fluid}
                                alt={pizza.name}
                            />
                            <div>
                                <h2>{pizza.name}</h2>
                            </div>
                            <div>
                                {['S', 'M', 'L'].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            addToOrder({
                                                id: pizza.id,
                                                size,
                                            })
                                        }
                                    >
                                        {size}{' '}
                                        {formatMoney(
                                            calculatePizzaPrice(
                                                pizza.price,
                                                size
                                            )
                                        )}
                                    </button>
                                ))}
                            </div>
                        </MenuItemStyles>
                    ))}
                </fieldset>
                <fieldset className="order">
                    <legend>Order</legend>
                    <PizzaOrder
                        order={order}
                        removeFromOrder={removeFromOrder}
                        pizzas={pizzas}
                    />
                </fieldset>
                <fieldset>
                    <h3>
                        Your total is{' '}
                        {formatMoney(calculateOrderTotal(order, pizzas))}
                    </h3>
                    <button type="submit">Order Ahead</button>
                </fieldset>
            </Orderstyles>
        </>
    );
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                id
                name
                slug {
                    current
                }
                price
                image {
                    asset {
                        fluid(maxWidth: 100) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
