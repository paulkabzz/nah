import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostList from "./GridPostList"

type SearchResulstProps = {
    isSearchFetching: boolean,
    searchedPosts: Models.Document[]
}

const SearchResults = ({ isSearchFetching, searchedPosts} : SearchResulstProps) => {

    if (isSearchFetching) return <Loader />;
    if(searchedPosts && searchedPosts.documents.length > 0) {
        return (
        <GridPostList posts={searchedPosts.documents}/>
        )
    }

  return (
    <p className="text-light-4 w-full mt-10 text-center">
        No results found.
    </p>
  )
}

export default SearchResults