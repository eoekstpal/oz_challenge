import Head from "next/head";
import homeStyles from "@/styles/Home.module.css";
import { getSortedPostsData } from "../lib/post"
import type { GetStaticProps } from "next";

const Home = ({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <div>
      <Head>
        <title>SEMI</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>introduction</p>
        <p>
          website
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({id, title, date}) =>
          <li className={homeStyles.listItem} key={id}>
            <a>{title}</a>
            <br />
            <small className={homeStyles.lightText}>
              {date}
            </small>
          </li>
          )}
        </ul>
      </section>
    </div>
  );
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}