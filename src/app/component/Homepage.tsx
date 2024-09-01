import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';



const Homepage= () => {

  return (
    <div className="p-4 border-2 border-green-400">
      <h1>Fetch the data</h1>
     
    </div>
  );
};

export default Homepage;
