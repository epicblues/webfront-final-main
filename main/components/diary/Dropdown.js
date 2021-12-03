import React, { useState } from "react";
import { Dropdown, Modal, Button, Header, Icon } from 'semantic-ui-react'
// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faDumbbell, faHamburger } from "@fortawesome/free-solid-svg-icons";

const options = [
  {
    key: 'maintenance',
    text: '유지',
    value: 'maintenance',
    content: '유지',
  },
  {
    key: 'cutting',
    text: '감량',
    value: 'cutting',
    content: '감량',
  },
  {
    key: 'bulking',
    text: '증량',
    value: 'bulking',
    content: '증량',
  },
]

const DropdownMenu = ({selected, setSelected, }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <div>
    {'내게 맞는 식단을 선택하세요!'}
    {/* <i className='ellipsis vertical icon'></i> */}
      <Dropdown
        // inline
        options={options}
        defaultValue={options[selected].value}
        onChange={(e) => { setSelected(['유지','감량','증량'].indexOf(e.target.innerText))}}
      />
      {/* <Modal
            trigger={
                      <Dropdown
                        // inline
                        options={options}
                        defaultValue={options[selected].value}
                        onChange={(e) => { setSelected(['유지','감량','증량'].indexOf(e.target.innerText))}}
                      />
                    }
            className='dropdown-modal'
            style = {{
              transform : isOpen ? "none" : "block"
            }}
      >
          <div className='dropdown-modal-content'>
              <div className='managing-option'>
                <div>유지</div>
                <FontAwesomeIcon icon={faUtensils} className='icon' />
              </div>
              <div className='managing-option'>
                <div>감량</div>
                <FontAwesomeIcon icon={faDumbbell} className='icon' />
              </div>
              <div className='managing-option'>
                <div>증량</div>
                <FontAwesomeIcon icon={faHamburger} className='icon' />
              </div>
          </div>
          <Button className='dropdown-modal-action'
                  onClick={() => setIsOpen(!isOpen)}
          >
            취소
          </Button>
      </Modal> */}
  </div>
  )
}

export default DropdownMenu
