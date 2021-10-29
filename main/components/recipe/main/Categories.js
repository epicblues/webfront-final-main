import Link from 'next/link'
import categoriesStyles from '../../../styles/Categories.module.css'

function showCategories() {
    return (
        <div className={categoriesStyles.button}>
            <ul>
                <li>
                    <Link href="/recipe/list">
                    <a>전체</a>
                    </Link>
                </li>
                <li>
                    <Link href="/recipe/list/grill">
                    <a>구이</a>
                    </Link>                    
                </li>
                <li>
                    <Link href="recipe/list/soup">
                    <a>국/탕</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default showCategories;