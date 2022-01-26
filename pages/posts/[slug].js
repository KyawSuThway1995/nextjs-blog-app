import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

export default function PostDetailPage(props) {
    return ( 
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt}/>
            </Head>
        <PostContent post={props.post}/>
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const {params} = context;
    const {slug} = params;
    const postData = getPostData(slug.concat('.md'));
    return {
        props: {
            post: postData
        },
        revalidate: 600
    }
}

export async function getStaticPaths() {
    const postsFileNames = getPostFiles();
    const slugs = postsFileNames.map(fileName => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map(slug => ({params: {slug: slug}})),
        fallback: false
    }
}