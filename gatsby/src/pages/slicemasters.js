import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const SlicemasterGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
    a {
        text-decoration: none;
    }
    .gatsby-image-wrapper {
        height: 400px;
    }
    h2 {
        transform: rotate(-2deg);
        text-align: center;
        font-size: 4rem;
        margin-bottom: -2rem;
        position: relative;
        z-index: 2;
    }
    .description {
        background: var(--yellow);
        padding: 1rem;
        margin: 2rem;
        margin-top: -6rem;
        z-index: 2;
        position: relative;
        transform: rotate(1deg);
        text-align: center;
    }
`;

export default function SliceMastersPage({ data: { slicemasters } }) {
    return (
        <>
            <h2 className="center">
                We have {slicemasters.nodes.length} slicemasters. Get to know
                them!
            </h2>
            <SlicemasterGrid>
                {slicemasters.nodes.map((slicemaster) => (
                    <SlicemasterStyles key={slicemaster.id}>
                        <Link to={`/slicemaster/${slicemaster.slug.current}`}>
                            <h2>
                                <span className="mark">{slicemaster.name}</span>
                            </h2>
                        </Link>
                        <Img
                            fluid={slicemaster.image.asset.fluid}
                            alt={slicemaster.image.name}
                        />
                        <p className="description">{slicemaster.description}</p>
                    </SlicemasterStyles>
                ))}
            </SlicemasterGrid>
        </>
    );
}

export const query = graphql`
    query SlicemasterQuery {
        slicemasters: allSanityPerson {
            totalCount
            nodes {
                description
                name
                id
                image {
                    asset {
                        fluid(maxWidth: 900) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
                slug {
                    current
                }
            }
        }
    }
`;
