// post_id 인자로 사용
function ShowListOne() {
    return (
        <div id="columns">
            <div class="recipe_thumbnail_card">
                {/* a 태그 -> link 태그로 리팩토링하여 리렌더링 방지할 것 */}
                <a href="#">
                    {/* img를 DB에서 불러올 수 있게 연결할 것 */}
                    <img id="recipe_thumbnail" src="img/recipe_thumbnail_sample.jpg" />
                    {getThumbnailContent()}
                </a>
            </div>
        </div>
    );
}

//  post_id 인자로 사용
function getThumbnailContent() {
    return (
        // main_title, sub_title, likes, avg_score를 DB에서 불러올 수 있게 연결할 것
        <div id="recipe_thumbnail_content">
            <p id="main_title">main_title</p>
            <p id="sub_title">sub_title</p>
            <p id="likes">100</p>
            <p id="avg_score">5.0</p>
        </div>
    )
}

export default ShowListOne;