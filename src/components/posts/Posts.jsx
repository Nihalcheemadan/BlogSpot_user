import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [blog, setBlog] = useState([]);
  // const [selectedButton, setSelectedButton] = useState(null);
  // const[tempBlog, setTempBlog]= useState([])
  const[tempProduct, setTempProduct]= useState([])
  const [selectedButton, setSelectedButton] = useState(null);

  const [category, setCategory] = useState("");

  useEffect(() => {
    const getBlog = async (req, res) => {
      await axios.get("/api/admin/getBlog").then((res) => {
        const data = res.data.blog
        setBlog(res.data.blog);
        category ? setTempProduct(data.filter((product)=>product.category == category)): setTempProduct(data);
      });
    };
    getBlog();
    
  }, []);

  

  useEffect(() => {
    axios.get("/api/user/categories").then((res) => {
      setCategory(res.data);
    });
  }, []);

  const [search, setSearch] = useState("");

  const searchData = (blog) => {
    return search === "" ? blog : blog.title.toLowerCase().includes(search);
  };

  const filterByCategory =(work) => {
    console.log(work,'loggedddddddddddd');
    setSelectedButton(work);

  const filteredCategory = category.filter((category) =>
       category.includes(work)
     )
     console.log(filteredCategory);
     
     if(filteredCategory){
         
         let filtered = []
          filteredCategory.map((category)=>
                 filtered.push( (blog.filter((products)=> products.category === category.categoryName) ) 
                ) 
          )

          // to flattern  nested array
           let resultProduct =[]
          for (let [a, b] of filtered) {
              resultProduct.push(a, b);
            }

            // to filter undefined product from  array
            const finalProducts= resultProduct.filter((value) => value !== undefined);
          
           setTempProduct(finalProducts)
     }  
 
};

  return (
    <>
      <form class="flex items-center mb-5">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            onChange={(e) => {
              let searchValue = e.target.value.toLocaleLowerCase();
              setSearch(searchValue);
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>

      <div className="inline-flex mb-4 gap-4">
        <button
          // onClick={}
          className="bg-gray-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          View All posts
        </button>
        {category &&
          category?.map((category) => (
            <div>
              <button onClick={()=>filterByCategory("Food")}   className="bg-gray-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                {category.category}
              </button>
            </div>
          ))}
      </div>

      <div className="posts">
        {Array.isArray(tempProduct) &&
          tempProduct
            .filter(searchData)
            .map((post) => <Post post={post} key={post._id} />)}
      </div>
    </>
  );
};

export default Posts;
