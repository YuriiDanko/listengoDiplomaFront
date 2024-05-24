import React from 'react';
import cl from './Search.module.css';
import { TextInput } from '@mantine/core';
import { IconCheckbox, IconHome, IconList, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

  return (
    <div className={cl.searchBody}>
      <div className={cl.searchBar}>
        <div>
          <TextInput placeholder='Search' w={468} leftSection={<IconSearch />} />
        </div>
      </div>
      <div className={cl.icons}>
        <IconHome onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
        <IconCheckbox onClick={() => navigate('/recommendations')} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default Search;
