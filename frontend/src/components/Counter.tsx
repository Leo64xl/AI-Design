import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";

const Counter: React.FC = () => {
 
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Test con Redux</h1>
    
    </div>
  );
};

export default Counter;
