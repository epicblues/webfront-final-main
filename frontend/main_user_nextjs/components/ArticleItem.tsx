import React, { FunctionComponent } from 'react'
import articleStyle from '../styles/Article.module.css';
import Link from 'next/link';


const ArticleItem: FunctionComponent<{ article: { userId, id, title, body } }> = ({ article }) => {
  return (

    <Link href="/article/[id]" as={`/article/${article.id}`}>
      <a className={articleStyle.card}>
        <h2 className={articleStyle.excerpt}>{article.title} &rarr;</h2>
        <p>{article.body}</p>
      </a>
    </Link>



  )
}

export default ArticleItem
