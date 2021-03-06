import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
    // 1. get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2 query all pizzas
    const { data } = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // 3. loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach((pizza) => {
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            },
        });
    });
}

async function turnToppingsIntoPages({ graphql, actions }) {
    // 1. get a template for this page
    const toppingTemplate = path.resolve('./src/pages/pizzas.js');
    // 2. query all toppings
    const { data } = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                }
            }
        }
    `);
    // 3. createPage for that topping
    data.toppings.nodes.forEach((topping) => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
            },
        });
    });
}

async function fetchBeersAndTurnIntoNodes({
    actions,
    createNodeId,
    createContentDigest,
}) {
    // fetch a list of beers
    const res = await fetch('https://api.sampleapis.com/beers/ale');
    const beers = await res.json();
    // loop over each one and create a node for each beer
    for (const beer of beers) {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            },
        };
        actions.createNode({ ...beer, ...nodeMeta });
    }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
    // query all slicemasters
    const { data } = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // turn each slicemaster into their own page
    data.slicemasters.nodes.forEach((slicemaster) => {
        actions.createPage({
            path: `/slicemaster/${slicemaster.slug.current}`,
            component: path.resolve('./src/templates/Slicemaster.js'),
            context: {
                slug: slicemaster.slug.current,
                name: slicemaster.person,
            },
        });
    });
    // figure out how many pages there are based on how many slicemasters t here are, and how many per page
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    // loop from 1 to n and create those pages
    Array.from({ length: pageCount }).forEach((_, i) => {
        actions.createPage({
            path: `/slicemasters/${i + 1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            context: {
                skip: i * pageSize,
                currentPage: i + 1,
                pageSize,
            },
        });
    });
}

export async function sourceNodes(params) {
    await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
    // create pages dynamically
    await Promise.all([
        // 1. pizzas
        turnPizzasIntoPages(params),
        // 2. toppings
        turnToppingsIntoPages(params),
        // 3. slicemasters
        turnSlicemastersIntoPages(params),
    ]);
}
