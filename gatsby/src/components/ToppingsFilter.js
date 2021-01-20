import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;
    a {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        padding: 5px;
        background: var(--grey);
        align-items: center;
        border-radius: 2px;
        .count {
            background: white;
            padding: 2px 5px;
        }
        .active {
            background: var(--yellow);
        }
    }
`;

function countPizzasInToppings(pizzas) {
    const count = pizzas
        .map((pizza) => pizza.toppings)
        .flat()
        .reduce((acc, topping) => {
            // check if this is an existing topping
            const existingTopping = acc[topping.id];
            if (existingTopping) {
                // if it is, increment by 1
                existingTopping.count += 1;
            } else {
                // otherwise create a new entry in our accumulator and set it to 1
                acc[topping.id] = {
                    id: topping.id,
                    name: topping.name,
                    count: 1,
                };
            }
            return acc;
        }, {});
    return Object.values(count).sort((a, b) => b.count - a.count);
}

export default function ToppingsFilter() {
    const { pizzas } = useStaticQuery(graphql`
        query {
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `);
    const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
    return (
        <ToppingsStyles>
            {toppingsWithCounts.map((topping) => (
                <Link key={topping.id} to={`/topping/${topping.name}`}>
                    <span className="name">{topping.name}</span>
                    <span className="count">{topping.count}</span>
                </Link>
            ))}
        </ToppingsStyles>
    );
}
