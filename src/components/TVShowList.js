import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import TVShow from "./TVShow";
import InfiniteScroll from "react-infinite-scroller";
import Adapter from "../Adapter";

function TVShowList(props) {
  const [data, setData] = useState([...props.shows]);
  const [page, setPage] = useState(2);
  const [isMounted, setIsMounted] = useState(true);

  function mapAllShows() {
    if (!!props.searchTerm) {
      return data.map((s) => {
        if (s.name.toLowerCase().includes(props.searchTerm)) {
          return <TVShow show={s} key={s.id} selectShow={props.selectShow} />;
        }
      });
    }
    return data.map((s) => (
      <TVShow show={s} key={s.id} selectShow={props.selectShow} />
    ));
  }

  useEffect(() => {
    setIsMounted(true);

    setPage(2);

    return () => setIsMounted(false);
  }, [props.searchTerm, props.filterByRating]);

  const loading = async () => {
    let showItems = false;
    if (!!!props.searchTerm) showItems = await Adapter.getShows(page);
    if (isMounted && showItems) {
      setData((prev) => [...prev, ...showItems]);
      setPage((prev) => prev + 1);
    }
    // const fetchData = async () => {
    //   const showItems = await Adapter.getShows();
    //   setData((prev) => [...prev, showItems]);
    // };
    // fetchData();
  };

  return (
    <div className="TVShowList">
      <InfiniteScroll
        pageStart={page}
        loadMore={loading}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Grid>{mapAllShows()}</Grid>
      </InfiniteScroll>
    </div>
  );
}

export default TVShowList;
