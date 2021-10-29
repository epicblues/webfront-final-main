import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import ImageUpload from '../../components/diary/meal_detail/ImageUpload';

const AddFoodDetail = () => {
    return (
        <div style={{display: 'grid', gridGap: '1rem'}}>
            <div>
                <ImageUpload />
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
