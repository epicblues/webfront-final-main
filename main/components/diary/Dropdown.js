import React from 'react'
import { Dropdown, Header, Icon } from 'semantic-ui-react'

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
  <Header as='h4'>
    <Icon name='utensil spoon' />
    <Header.Content>
      {' '}
      <Dropdown
        inline
        header='Managing Diet'
        options={options}
        defaultValue={options[selected].value}
        onChange={(e) => { setSelected(['유지','감량','증량'].indexOf(e.target.innerText))}}
        
        
        
      />
    </Header.Content>
  </Header>
)

export default DropdownMenu