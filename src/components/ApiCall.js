import React from 'react';
import axios from "axios";


export const SubCategory = async () => {
     await axios.get("https://localhost:7274/api/Account/RetrieveSubCategoryDetails/subcategories?Category=Mens%20Wear"
    );
  };
  SubCategory();

const ApiCall = () => {
   
  return (
    <>
    <div></div>
    </>
  )
}

export default ApiCall;
