import React, { Component } from 'react'
import {
    Input,
    Icon,
    Button,
    Popup,
  } from 'semantic-ui-react'

export class ListModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
          finalKcal: '-',
          inputAmount: '',
          disabled: false,
          meal_tag: '',
          loading: false,
        }
      }
      
      // 먹은 양 받기
      handleAmount = e => {
        const finalKcal =
          this.props.calculateKcal * e.target.value
        this.setState({
          finalKcal: finalKcal.toFixed(3),
          inputAmount: e.target.value,
        })
        // 양 입력 안했을 경우 버튼 비활성화
        if (e.target.value > 0)
          this.setState({
            disabled: false,
          })
      }
      
    render() {
        const {
            disabled,
            finalKcal,
            loading,
          } = this.state
      
          const {
            foodResult,
            calculateKcal,
            isSelected,
            toggleSearchMode,
          } = this.props
      
          const details = (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span className="diary-food-search-label-result-title">
                음식결과이름
              </span>
              <span className="diary-food-search-label-result-kcal">
                {calculateKcal}
              </span>
              <div className="diary-food-search-label-result-input">
                x
                <Input
                  ref={input =>
                    (this.textInput = input)}
                  placeholder="얼마나 먹었나요?"
                  onChange={e => this.handleAmount(e)}
                  style={{ width: '105px' }}
                  type="number"
                  onKeyDown={this.handleKeyPress}
                  error={disabled}
                />
                <span className="diary-food-search-label-result-unit">
                  푸드유닛
                </span>
                =
                <div className="diary-food-search-label-result-wrapper">
                  <span className="diary-food-search-label-result-calculateKcal">
                    {finalKcal}
                  </span>
                  <span className="diary-food-search-label-result-unit">
                    kcal
                  </span>
                </div>
              </div>
            </div>
          )
          const blank = (
            <span className="diary-food-search-label-result-title">
              <Icon color="teal" name="check" />
              검색 후 먹은 음식을 선택하세요.
            </span>
          )
          return (
            <div className="diary-food-search-label">
              <div className="diary-food-search-label-result">
                {isSelected ? details : blank}
              </div>
              <div>
                <Popup
                  trigger={
                    <Icon
                      name="help circle outline"
                      size="large"
                      color="teal"
                      style={{ marginRight: '14px' }}
                    />
                  }
                  header="음식의 양"
                  content="개인이 느끼는 1인분의 기준은 각자의 신체조건, 상태에 따라 매우 주관적이므로, 정확한 칼로리 계산을 위해서는 음식의 양을 입력해야합니다."
                />
                <Button onClick={toggleSearchMode}>
                  취소
                </Button>
                <Button onClick={this.createPayloadAndPostToDB}
                  loading={loading}
                  disabled={disabled}
                >
                  등록
                </Button>
              </div>
            </div>
          )
    }
}

export default ListModal
