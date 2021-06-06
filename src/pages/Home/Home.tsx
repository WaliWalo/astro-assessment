import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import ChannelList from '../../components/ChannelList/ChannelList';
import { useAppDispatch } from '../../store/setup/store';
import './styles.css';
import {
  findCategories,
  sortByChannelName,
  sortByStbNumber,
  findLanguages,
  filterByCategory,
  filterByLanguage,
  filterByResolution,
} from '../../utilities/filters';
import { getAllChannels, setChannels } from '../../store/channel/channelSlice';

function Home() {
  const dispatch = useAppDispatch();
  const [toggleSort, setToggleSort] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [languages, setLanguages] = useState<Array<string>>([]);
  // eslint-disable-next-line
  const [hd, setHd] = useState<boolean>(false);
  // eslint-disable-next-line
  const [checkedCategories, setCheckedCategories] = useState<Array<string>>([]);
  // eslint-disable-next-line
  const [checkedLanguages, setCheckedLanguages] = useState<Array<string>>([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await findCategories();
      if (categories !== undefined) {
        setCategories(categories);
      }
    }
    async function getLanguages() {
      const languages = await findLanguages();
      if (languages !== undefined) {
        setLanguages(languages);
      }
    }
    getCategories();
    getLanguages();
  }, []);

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

  const filterCategory = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked = [];
    if (e.currentTarget.checked) {
      checkedCategories.push(e.currentTarget.value);
      checked = checkedCategories;
      const newChannels = await filterByCategory(checked);
      if (newChannels !== undefined) {
        dispatch(setChannels(newChannels));
      }
    } else {
      checkedCategories.splice(
        checkedCategories.indexOf(e.currentTarget.value),
        1
      );
      checked = checkedCategories;
      const newChannels = await filterByCategory(checked);
      if (newChannels !== undefined) {
        dispatch(setChannels(newChannels));
      }
      if (checked.length === 0) {
        dispatch(getAllChannels());
      }
    }
  };

  const filterLanguage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let checked = [];
    if (e.currentTarget.checked) {
      checkedLanguages.push(e.currentTarget.value);
      checked = checkedLanguages;
      const newChannels = await filterByLanguage(checked);
      if (newChannels !== undefined) {
        dispatch(setChannels(newChannels));
      }
    } else {
      checkedLanguages.splice(
        checkedLanguages.indexOf(e.currentTarget.value),
        1
      );
      checked = checkedLanguages;
      const newChannels = await filterByLanguage(checked);
      if (newChannels !== undefined) {
        dispatch(setChannels(newChannels));
      }
      if (checked.length === 0) {
        dispatch(getAllChannels());
      }
    }
  };

  const filterHd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChannels = await filterByResolution(e.currentTarget.checked);
    if (newChannels !== undefined) {
      dispatch(setChannels(newChannels));
    }
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
                <div id="categories">
                  {categories.length > 0 &&
                    categories.map((category: string, index: number) => (
                      <div key={index}>
                        <Form.Check
                          type={'checkbox'}
                          id={`categoryChk${index}`}
                          label={`${category}`}
                          value={category}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            filterCategory(e)
                          }
                        />
                      </div>
                    ))}
                </div>
                <div id="languages">
                  {languages.length > 0 &&
                    languages.map((language: string, index: number) => (
                      <div key={index}>
                        <Form.Check
                          type={'checkbox'}
                          id={`languageChk${index}`}
                          label={`${language}`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            filterLanguage(e)
                          }
                          value={language}
                        />
                      </div>
                    ))}
                </div>
                <div id="resolution">
                  <Form.Check
                    type={'checkbox'}
                    id={`resolutionChk`}
                    label={`HD`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      filterHd(e)
                    }
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
