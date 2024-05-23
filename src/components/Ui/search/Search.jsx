import React from 'react';
import cl from './Search.module.css';
import { TextInput } from '@mantine/core';

const Search = () => {
  return (
    <div className={cl.searchBody}>
      <TextInput></TextInput>
    </div>
  );
};

export default Search;
