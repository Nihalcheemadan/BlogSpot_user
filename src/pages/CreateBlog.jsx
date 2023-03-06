import React from "react";
import Create from "../components/Create";
import NavigatioBar from "../components/NavigatioBar";

const CreateBlog = () => {
  return (
    <div className="bg-gray-100">
      <NavigatioBar />
      <Create />
    </div>
  );
};

export default CreateBlog;
