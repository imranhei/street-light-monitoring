import { Audio, Radio, Blocks, Dna } from "react-loader-spinner";
import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`flex justify-center items-center h-screen w-screen ${className}`}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
