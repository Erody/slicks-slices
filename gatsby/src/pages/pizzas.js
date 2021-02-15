import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
    const pizzas = data.pizzas.nodes;
    return (
        <>
            <SEO
                title={
                    pageContext.topping
                        ? `Pizzas with ${pageContext.topping}`
                        : `All Pizzas`
                }
            />
            <ToppingsFilter />
            <PizzaList pizzas={pizzas} />
        </>
    );
}

export const query = graphql`
    query PizzaQuery($topping: [String]) {
        pizzas: allSanityPizza(
            filter: { toppings: { elemMatch: { name: { in: $topping } } } }
        ) {
            nodes {
                name
                price
                id
                slug {
                    current
                }
                toppings {
                    name
                    id
                }
                image {
                    asset {
                        fluid(maxWidth: 400) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
