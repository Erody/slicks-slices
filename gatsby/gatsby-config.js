import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slicks Slices`,
        siteUrl: `https://gatsby.pizza`,
        description: `The best pizza place in hamilton`,
    },
    plugins: [
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'imtn27rn',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
};
