import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getUserOrRedirect } from "../../../api/auth"
import clientPromise from '../../../../util/mongodb'

import RcpData from '../../../../public/static/recipe/dataSample/RecipeData'

const index = () => {
    const router = useRouter();
    const { props } = router.query;
    console.log(props);
    return (
        <div id="columns">
            <Link exact to="/">
                <h1>Recipe Main</h1>
            </Link>
           
            <div className="rcp_thumb">
                {/* 상단 레시피 인트로 이미지, 썸네일과 동일 */}
                {/* <img id="rcp_thumb" src={`../${card.rcp_thumb_url}`} /> */}
                {/* 카테고리 중간 사이즈 폰트 */}
                {/* <p id="rcp_category">{card.rcp_category}</p> */}
                {/* 레시피 이름 */}
                {/* <p id="rcp_main_title">{card.rcp_main_title}</p> */}
                {/* 레시피 설명 */}
                {/* <p id="rcp_desc">{card.rcp_desc}</p> */}
                {/* 레시피 재료 */}
                {/* 영양성분표 Modal */}
                {/* <input type="button" value="영양성분보기" /> */}
            </div>
        </div>
    )
}

// export const getServerSideProps = async (ctx) => {
//     await getUserOrRedirect(ctx);
//     const client = await clientPromise;
//     const rcpData = await client
//       .db("webfront")
//       .collection("recipe")
//       .find({ "post_id": {card.post_id}  })
//       .project({ _id: 0 })
//       .toArray();
//     console.log(rcpData);
//     return { props: { rcpData } };
//   };

export default index
