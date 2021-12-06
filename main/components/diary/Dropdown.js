import React, { useState } from "react";
import { Modal, Button } from 'semantic-ui-react'
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
  <div className='dropdown-option'>
      <i  className='ellipsis vertical icon'
          onClick={() => {
                          setIsOpen(!isOpen);
          }}
      >
      </i>

      <Modal open={isOpen}
              className='dropdown-modal'
      >
          <div className='dropdown-modal-content'
                defaultValue={options[selected].value}
                onChange={(e) => {
                                  setSelected(['유지','감량','증량'].indexOf(e.target.innerText))
                }}
          >

              <div className='managing-option'
                    onClick={(e) => {
                                    setSelected(0);
                                    setIsOpen(false)
                    }}
              >
                <div>유지</div>
                <FontAwesomeIcon icon={faUtensils} className='icon' />
              </div>
              <div className='managing-option'
                    onClick={(e) => {
                                    setSelected(1);
                                    setIsOpen(false)
                    }}
              >
                <div>감량</div>
                <FontAwesomeIcon icon={faDumbbell} className='icon' />
              </div>
              <div className='managing-option'
                    onClick={(e) => {
                                    setSelected(2);
                                    setIsOpen(false)
                    }}
              >
                <div>증량</div>
                <FontAwesomeIcon icon={faHamburger} className='icon' />
              </div>
          </div>
          <Button className='dropdown-modal-action'
                  onClick={() => setIsOpen(!isOpen)}
          >
            취소
          </Button>
      </Modal>
  </div>
  )
}

export default DropdownMenu
