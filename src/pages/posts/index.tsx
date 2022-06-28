import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '../../../prismicio';
import styles from './styles.module.scss';
import { RichText } from 'prismic-dom';

export default function Post() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>22 de algo de 2202</time>
                        <strong>Create bla bla bla bla</strong>
                        <p>TEste de lasdkl ad alskd aslkdçl aksdlksal dkasçldkalskd lksd</p>
                    </a>
                    <a href="#">
                        <time>22 de algo de 2202</time>
                        <strong>Create bla bla bla bla</strong>
                        <p>TEste de lasdkl ad alskd aslkdçl aksdlksal dkasçldkalskd lksd</p>
                    </a>
                    <a href="#">
                        <time>22 de algo de 2202</time>
                        <strong>Create bla bla bla bla</strong>
                        <p>TEste de lasdkl ad alskd aslkdçl aksdlksal dkasçldkalskd lksd</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps({previewData}) {
    const client = createClient({previewData});
    const response = await client.getAllByType('post',{
        fetch: ['post.title','post.content'], pageSize: 100
    });
    console.log(response);
    const posts = response.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        };
    });

    console.log(posts);
    return {
        props: {
            response
        },
    }
}