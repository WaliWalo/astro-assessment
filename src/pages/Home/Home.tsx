import React, { useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import ChannelList from '../../components/ChannelList/ChannelList';
import { useAppDispatch } from '../../store/setup/store';
import './styles.css';
import { useAppSelector } from './../../store/setup/store';
import { sortByChannelName, sortByStbNumber } from '../../utilities/filters';
import { setChannels } from '../../store/channel/channelSlice';

function Home() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector((state) => state.channels.data);
  const [toggleSort, setToggleSort] = useState<boolean>(false);

  const sortName = async () => {
    const sorted = await sortByChannelName();
    if (sorted !== undefined) {
      if (toggleSort === false) {
        dispatch(setChannels(sorted));
      } else {
        dispatch(setChannels(sorted.reverse()));
      }
    }
    setToggleSort(!toggleSort);
  };

  const sortNumber = async () => {
    const sorted = await sortByStbNumber();
    if (sorted !== undefined) {
      if (toggleSort === false) {
        dispatch(setChannels(sorted));
      } else {
        dispatch(setChannels(sorted.reverse()));
      }
    }
    setToggleSort(!toggleSort);
  };

  return (
    <div>
      <Accordion>
        <Card>
          <Card.Header id="accordionHeader">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Advanced Filters
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div id="sortBtns">
                <Button variant="light" onClick={sortName}>
                  Sort By Name
                </Button>
                <Button variant="light" onClick={sortNumber}>
                  Sort By Number
                </Button>
              </div>
              <div id="checkBoxes">
                <div>
                  <Form.Check
                    type={'checkbox'}
                    id={`categoryChk`}
                    label={`Filter by Category`}
                  />
                </div>
                <div>
                  <Form.Check
                    type={'checkbox'}
                    id={`languageChk`}
                    label={`Filter by Language`}
                  />
                </div>
                <div>
                  <Form.Check
                    type={'checkbox'}
                    id={`resolutionChk`}
                    label={`Filter by Resolution`}
                  />
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <ChannelList />
    </div>
  );
}

export default Home;
