import React, { useState } from 'react';
import cl from './Search.module.css';
import { TextInput } from '@mantine/core';
import { IconCheckbox, IconHome, IconList, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({ query: searchQuery.replace(/\/|\\/, '') });
    navigate({ pathname: '/search', search: `?${queryParams}` });
    setSearchQuery('');
  };

  return (
    <div className={cl.searchBody}>
      <div className={cl.searchBar}>
        <div>
          <form onSubmit={submit}>
            <TextInput
              placeholder='Search'
              w={468}
              leftSection={<IconSearch />}
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
            />
          </form>
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
