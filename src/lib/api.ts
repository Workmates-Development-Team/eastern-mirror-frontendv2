import axios from "axios";

export const fetchBlogSlugs = async () => {
  try {
    const { data } = await axios.get("https://api.easternmirrornagaland.com/api/v1/article/all?limit=100");
 
    return data?.articles
  } catch (error) {
    console.log(error);
  }
};
