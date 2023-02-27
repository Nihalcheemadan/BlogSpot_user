import axios from "axios";
import { useEffect, useState } from "react";

const RightBar = () => {

  const [category,setCategory] = useState('')

  useEffect(()=>{
    axios.get('/api/user/categories').then((res)=>{
      setCategory(res.data);
    })
  },[])
  console.log(category,'gggggggggggg');
  return (
    <div class="py-4 px-6 w-48 mt-12 h-72 mr-8 bg-white rounded">

      {/* <h4 class="mb-4 text-gray-500 font-bold uppercase">Categories</h4>
      <ul>
        <li>
          <p
            // onClick={() => {dispatch(fetchPostAction("")); setPostUser(false)}}
            className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
          >
            View All Posts
          </p>
        </li>
        

        {category && category?.map((category) => (
        <li>
          <p
            // onClick={() =>
            //   {dispatch(fetchPostAction(category?._id));setPostUser(false)}
            // }
            className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
          >
            {category.category}
          </p>
        </li>
        ))} 
      </ul> */}
    </div>
  );
};

export default RightBar;
