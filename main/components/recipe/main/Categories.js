import Link from 'next/link'

function showCategories() {
    return (
        <div className="category_button">
            <Link href="/recipe/list">
                <a>전체</a>
            </Link>
            <a href="#">
                <p>밥</p>
            </a>
            <a href="#">
                <p>국/탕</p>
            </a>
        </div>
    );
}

export default showCategories;