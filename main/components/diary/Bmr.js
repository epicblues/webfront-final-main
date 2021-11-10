import React, { Component } from 'react'
import { Icon, Popup } from 'semantic-ui-react'

class Bmr extends Component {


    constructor() {

        super();

        this.state = {

            gender: '',
            weight: '',
            age:'',
            activity:'',
            bmr: '',
            error: '',
            flag: false,
            system: ''

        }

    }

    handleAgeChange= (event) => {

        this.setState({age:event.target.value });
    }
    handleWeightChange= (event) => {

        this.setState({weight:event.target.value });
    }
    handleHeightFeetChange= (event) => {

        this.setState({heightfeet:event.target.value });
    }
    handleGenderChange= (event) => {

        this.setState({gender:event.target.value });
    }
    handleActivityChange= (event) => {

        this.setState({activity:event.target.value });
    }
    handleSystemChange= (event) => {

        this.setState({system:event.target.value });
    }

    calculateBMR() {


        let age = this.state.age;
        let weight = this.state.weight;
        let heightFeet = this.state.heightfeet;  //will be used as height in CM for metric system
        let gender = this.state.gender;
        
        // Error Message
        if(age == '' || weight == '' || gender == '' || heightFeet == '')
        {
            this.setState({error: 'All fields are required'});
            return;
        }

        var bmrCalc = '';
        
        /*BMR calculation (Metric): 
          Man BMR = 66.5 + ( 13.75 × weight in kg ) + ( 5.003 × height in cm ) – ( 6.755 × age in years )
          Woman BMR = BMR = 655 + ( 9.563 × weight in kg ) + ( 1.850 × height in cm ) – ( 4.676 × age in years )*/ 
        if(gender == 1) //Female
            {  bmrCalc = 655 + ( 9.563 * weight ) + ( 1.850 * heightFeet ) - ( 4.676 * age ) }
            else if (gender == 2) //Male
            {  bmrCalc=  66.5 + ( 13.75 * weight) + ( 5.003 * heightFeet) - ( 6.755 * age )  }

        this.setState({bmr:bmrCalc});
        this.setState({flag:true});
        this.setState({error: ''});
    }

    calculateAct() {
        let ActCalc;

        
        if (this.state.activity == '1.2')
        {  ActCalc = this.state.bmr * 1.2;}
        else if(this.state.activity == '1.375') 
        {ActCalc = this.state.bmr * 1.375;}
        else if(this.state.activity == '1.55') 
        {ActCalc = this.state.bmr * 1.55;}
        else if(this.state.activity == '1.725') 
        {ActCalc = this.state.bmr * 1.725;}
        else if(this.state.activity == '1.9') 
        {ActCalc = this.state.bmr * 1.9;}
        this.setState({activity:ActCalc});

    }


    render() {

        let error;
        if(this.state.error)
        {error=
            <div className='error' style={{color: 'red', marginBottom: '1rem'}} >
                {this.state.error}
                <i className="frown outline icon"></i>
            </div>
        }
        let result;
        if(this.state.bmr)
        {result = <div className="result">{this.state.bmr}</div>}
        
        let resultAct;
        if(this.state.bmr)
        {resultAct = <div className="result">{this.state.activity}</div>}
            
        if(this.state.flag == true) {
            var a = true;
        }   

        return (
            <div id="bmrcalc" style={{border: 'solid 2px lightgray', borderRadius: '5px', padding: '16px'}}>
                <div className="ui form">
                    <h2>기초대사량 &amp; 일일 권장 칼로리</h2>
                    {error}
                    <div className="inputwrap inline fields">
                        <label className="label">성별</label>
                        <label><input type="radio" checked={this.state.gender === '1'} onChange={this.handleGenderChange} className="genderF ui radio checkbox" name="gender" value="1" />여성</label>
                        <label><input type="radio" checked={this.state.gender === '2'} onChange={this.handleGenderChange} className="genderM ui radio checkbox" name="gender" value="2" />남성</label>
                    </div>
                   
                    <div className='three fields' style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            textAlign: 'left'
                                                          }}
                    >
                        <div className="inputwrap field">
                            <label className="label">체중</label>
                            <input type="number" value={this.state.weight} onChange={this.handleWeightChange} name="weight" className="weight" min="0" max="999" placeholder="Weight"/>
                        </div>
                        <div className="inputwrap field">
                            <label className="label">신장</label>
                            <input type="number"  value={this.state.heightfeet} onChange={this.handleHeightFeetChange} name="heightFeet" className="heightFeet" min="0" max="8" placeholder='Height' />
                            
                        </div>
                        <div className="inputwrap field">
                            <label className="label">나이</label>
                            <input type="number" value={this.state.age} onChange={this.handleAgeChange} className="age" name="age" min="0" max="120" placeholder='Age' />
                        </div>
                    </div>
                    <button type="button"
                            onClick={() => this.calculateBMR()}
                            className='ui teal fluid button'
                            style={{marginBottom: 16}}
                    >
                            기초 대사량 계산하기
                    </button>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <Popup
                              trigger={
                                <Icon
                                  name="circle outline"
                                  size="large"
                                  color="teal"
                                />
                              }
                              header="기초대사량"
                              content="우리의 심장이 뛰고, 호흡을 하고, 체온을 유지하며, 뇌가 활동을 하는데 필요한 생명 유지를 위한 최소한의 에너지"
                            />
                            나의 기초대사량은?
                        </div>
                        <div style={{color: 'red'}}>
                            {result}
                        </div>
                    </div>
                    { a == true && <div className="workout"> 
            
                        <div className="inputwrap" style={{marginTop: '16px'}}>
                            <select className="activity" value={this.state.activity} onChange={this.handleActivityChange} name="activity">
                                <option value="">활동 수준을 선택하세요</option>
                                <option value="1.2">운동을 거의 또는 전혀 하지 않고 사무직</option>
                                <option value="1.375">주 1~3일 가벼운 운동</option>
                                <option value="1.55">주 3~5일 적당한 운동</option>
                                <option value="1.725">주 6~7일 과중한 운동</option>
                                <option value="1.9">매우 격렬한 운동 및 육체 노동, 하루에 여러 번 운동</option>
                            </select>
                        </div>
                        <button type="button"
                                onClick={() => this.calculateAct()}
                                className='ui teal fluid button'
                                style={{margin: '16px 0 16px 0'}}
                        >
                                하루 권장 섭취량 계산하기
                        </button>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                              <Popup
                                trigger={
                                  <Icon
                                    name="circle outline"
                                    size="large"
                                    color="teal"
                                  />
                                }
                                header="하루 권장섭취량"
                                content="일반적으로 성인의 경우 남자 2700kcal, 여자 2000kcal 정도로 개개인마다 활동량, 체중, 성별, 건강 상태 등에 따라 하루 권장 칼로리가 달라진다"
                              />
                              나의 하루에 필요한 에너지량은?
                            </div>
                            <div style={{color: 'red'}}>
                                {resultAct}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Bmr;