import React, { FunctionComponent } from 'react'
import articleStyle from '../styles/Article.module.css'
import ArticleItem from './ArticleItem'


const ArticleList: FunctionComponent<{ articles: [any] }> = ({ articles }) => {
  return (
    <div className={articleStyle.grid}>
      {articles.map(article =>
        <ArticleItem article={article} key={article.id} />
      )}
    </div>
  )
}

export default ArticleList
