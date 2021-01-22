import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const PizzaGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SinglePizzaPage({ data: { pizza } }) {
    return (
        <PizzaGrid>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <div>
                <h2 className="mark">{pizza.name}</h2>
                <ul>
                    {pizza.toppings.map((topping) => (
                        <li key={topping.id}>{topping.name}</li>
                    ))}
                </ul>
            </div>
        </PizzaGrid>
    );
}

export const query = graphql`
    query($slug: String!) {
        pizza: sanityPizza(slug: { current: { eq: $slug } }) {
            name
            id
            image {
                asset {
                    fluid(maxWidth: 800) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            toppings {
                name
                id
                vegetarian
            }
        }
    }
`;
