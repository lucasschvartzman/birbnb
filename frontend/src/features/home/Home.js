import React, { useRef } from 'react';
import Header from '../../components/Header';
import Search from '../../components/Search';


function Home() {
  const searchRef = useRef(null);
  const handleScrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Header onVerAlojamientosClick={handleScrollToSearch} />
      <div ref={searchRef}><Search/></div>
    </>
  );
}

export default Home;
