import React, { useRef } from 'react';
import Header from '../../components/header/Header.js';
import SearchSection from '../../components/search/SearchSection';
import {Box} from "@mui/material";

function Home() {
  const searchRef = useRef(null);

  const handleScrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box>
      <Header onVerAlojamientosClick={handleScrollToSearch} />
      <div ref={searchRef}>
        <SearchSection />
      </div>
    </Box>
  );
}

export default Home;