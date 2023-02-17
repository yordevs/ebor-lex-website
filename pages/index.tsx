import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";

export default function Index({ allPosts: { edges } }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <Layout>
      <Head>
        <title>Ebor Lex Journal</title>
      </Head>
      {/* This is currently the latest post added to WP */}
      {heroPost && (
        //This is the HeroPost component needs some work to make it look like the figma design
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.featuredImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsForHome();

  return {
    props: { allPosts },
    revalidate: 10,
  };
};
