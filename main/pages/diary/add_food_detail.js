import React from 'react'
import { useForm } from "react-hook-form"
import 'semantic-ui-css/semantic.min.css';
import ImageUpload from '../../components/diary/meal_detail/ImageUpload';
import './add_food'

//  작성폼 초기값
const initialValues = {
    
}

const AddFoodDetail = () => {
    // 폼을 만들기 위한 여러가지 요소 불러오기
    const { register, handleSubmit } = useForm();

    // 데이터 전송시 작동할 함수 정의
    const onSubmit = (data) => {
        let DiaryData = initialValues
        DiaryData = {
            ...initialValues,
            name: data.name,
            kcal: data.kcal,
        }
        // 기본으로 Diarydata 가져오기
        console.log(DiaryData)
    }


    return (
        <div style={{display: 'grid', gridGap: '1rem'}}>
            <div>
                <ImageUpload />
            </div>
            
            <div>
                <form onSubmit ={handleSubmit(onSubmit)}>
                    <label>이름</label>
                    <input 
                        type="text" 
                        placeholder=" 재료 or 음식 이름" 
                        {...register("name", { required : true })}
                    />
                    <br />

                    <label>칼로리</label>
                    <input
                        type="text"
                        placeholder="칼로리 Kcal"
                        {...register("kcal", { required : true })}
                    />
                    <br />

                    <label>탄수화물</label>
                    <input
                        type="text"
                        placeholder="탄수화물 g"
                        {...register("", { required : true })}
                    />
                    <br />

                    <label>단백질</label>
                    <input
                        type="text"
                        placeholder="단백질 g"
                        {...register("", { required : true })}
                    />
                    <br />

                    <label>지방</label>
                    <input
                        type="text"
                        placeholder="지방 g"
                        {...register("", { required : true })}
                    />
                    <br />

                    <input type="submit" value="완료"/>
                </form>
            </div>










            <div className="ui middle aligned divided list">
                <h4>추가한 음식</h4>
                <div className="item">
                    <div className="right floated content">
                        <i className='angle right icon'></i>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">사과
                                <div className="description">gram</div>
                            </div>
                            <div>Kcal</div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="right floated content">
                        <i className='angle right icon'></i>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">미역국
                                <div className="description">gram</div>
                            </div>
                            <div>Kcal</div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="right floated content">
                        <i className='angle right icon'></i>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">닭가슴살
                                <div className="description">gram</div>
                            </div>
                            <div>Kcal</div>
                        </div>
                    </div>
                </div>

                <div className="item">
                    <div className="right floated content">
                        <i className='angle right icon'></i>
                    </div>

                    <div className="content">
                        <div style={{display: "flex", justifyContent: 'space-between', textAlign:'left'}}>
                            <div className="header">초밥
                                <div className="description">gram</div>
                            </div>
                            <div style={{}}>Kcal</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddFoodDetail
