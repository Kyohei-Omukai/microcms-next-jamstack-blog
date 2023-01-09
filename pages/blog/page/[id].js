import Link from 'next/link';
import { Pagination } from '../../../components/Pagination';
import { client } from "../../../libs/client";
import styles from '../../../styles/Home.module.scss';

const PER_PAGE = 5; 

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
  return (
    <main className={styles.main}>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id} className={styles.entryList}>
            <Link href={`/blog/${blog.id}`}>
              {blog.eyecatch && (
              <div className={styles.eyecatch}>
                <img src={blog.eyecatch?.url} alt="" />
              </div>
              )}
              <div>
                <h2 className={styles.entryTitle}>{blog.title}</h2>
                <p className={styles.publishedAt}>{blog.publishedAt}</p>
                <p className={styles.category}>{blog.category && blog.category.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </main>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const id = context.params.id;

  const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 5, limit: 5 } });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};