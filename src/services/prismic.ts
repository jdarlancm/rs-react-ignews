import Prismic from '@prismicio/client';

export const repositoryName = 'ignews';

export const prismic = Prismic.createClient(
    repositoryName,
    {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        routes: [
            {
                type: 'Post',
                path: '/posts',
            }
        ]
    }
);