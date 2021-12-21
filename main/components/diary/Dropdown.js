import React, { useState } from "react";
// semantic-ui
import { Modal, Button } from 'semantic-ui-react'
// react-icons
import { MdOutlineTrendingFlat, MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { BiTransferAlt } from "react-icons/bi";
// css
import MainStyles from '../../styles/diary/Main.module.css';

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
  <div className={MainStyles.dropdownOption}>
      <BiTransferAlt
        className={MainStyles.changeOption}
        onClick={() => {setIsOpen(!isOpen);}}
      />
      <Modal open={isOpen}
              className={MainStyles.dropdownModal}
      >
          <div className={MainStyles.dropdownModalContent}
                defaultValue={options[selected].value}
                onChange={(e) => {
                                  setSelected(['유지','감량','증량'].indexOf(e.target.innerText))
                }}
          >

              <div className={MainStyles.managingOption}
                    onClick={(e) => {
                                    setSelected(0);
                                    setIsOpen(false)
                    }}
              >
                <div>유지</div>
                <MdOutlineTrendingFlat size='1.6rem' color="#888" />
              </div>
              <div className={MainStyles.managingOption}
                    onClick={(e) => {
                                    setSelected(1);
                                    setIsOpen(false)
                    }}
              >
                <div>감량</div>
                <MdOutlineTrendingDown size='1.6rem' color="#888" />
              </div>
              <div className={MainStyles.managingOption}
                    onClick={(e) => {
                                    setSelected(2);
                                    setIsOpen(false)
                    }}
              >
                <div>증량</div>
                <MdOutlineTrendingUp size='1.6rem' color="#888" />
              </div>
          </div>
          <Button className={MainStyles.dropdownModalAction}
                  onClick={() => setIsOpen(!isOpen)}
          >
            취소
          </Button>
      </Modal>
  </div>
  )
}

export default DropdownMenu
