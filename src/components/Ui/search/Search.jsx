import React from 'react';
import cl from './Search.module.css';
import { TextInput } from '@mantine/core';
import { IconCheckbox, IconHome, IconList, IconSearch } from '@tabler/icons-react';

const Search = () => {
  return (
    <div className={cl.searchBody}>
      <div className={cl.searchBar}>
        <div>
          <TextInput placeholder='Search' w={468} leftSection={<IconSearch />} />
        </div>
      </div>
      <div className={cl.icons}>
        <IconHome></IconHome>
        <IconCheckbox></IconCheckbox>
      </div>
    </div>
  );
};

export default Search;
