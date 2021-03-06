import matter from "gray-matter";
import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts")

export function getPostFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(fileName) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const {data, content} = matter(fileContent);
    const postSlug = fileName.replace(/\.md$/, '');
    const postData = {
        slug: postSlug,
        ...data,
        content
    };
    return postData;
}

export function getAllPosts() {
    const postFiles = getPostFiles();
    return postFiles.map(postFile => getPostData(postFile)).sort((postA, postB) => postB.date - postA.date);
}

export function getFeaturedPosts() {
    return getAllPosts().filter(post => post.isFeatured);
}