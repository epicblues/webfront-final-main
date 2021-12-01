import React from 'react'
import { Dropdown, Header, Icon } from 'semantic-ui-react'
// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

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

const DropdownMenu = ({selected, setSelected}) => (
  <div style={{fontSize: '1.4rem'}}>
    {' '}
    {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
      <Dropdown
        inline
        options={options}
        defaultValue={options[selected].value}
        onChange={(e) => { setSelected(['유지','감량','증량'].indexOf(e.target.innerText))}}
      />
  </div>

  // <div class="container">
  //   <a class="dropdownBtn js-click-modal">Open Modal</a>
  //   <div class="dropdownModal">
  //     <div class="header">This is a full-width modal with a title</div>
  //     <div class="body">
  //       <p>And here is all its contents.</p>
  //       <a class="dropdownBtn js-close-modal">Close</a>
  //     </div>
  //   </div>
  // </div>


)

export default DropdownMenu
