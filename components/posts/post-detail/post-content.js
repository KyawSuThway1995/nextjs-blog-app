import Image from "next/image";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import {Light as SyntaxHighlighter}  from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/hljs/css";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("css", css);

export default function PostContent(props) {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    const customRenders = {
        // img(image) {
        //     const imagePath = `/images/posts/${post.slug}/${image.src}`;
        //     return (
        //         <Image
        //             src={imagePath}
        //             alt={image.alt}
        //             width={600}
        //             height={600}
        //             layout="responsive"
        //         />)
        // },
        p(paragraph) {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const imgNode = node.children[0];
                const { src, alt } = imgNode.properties;
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${src}`}
                            alt={alt}
                            width={600}
                            height={600}
                            layout="responsive"
                        />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },
        code(code) {
            return <SyntaxHighlighter style={atomOneDark} language="javascript">{code.children}</SyntaxHighlighter>
        }
    };
    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenders}>
                {post.content}
            </ReactMarkdown>
        </article>
    )
}