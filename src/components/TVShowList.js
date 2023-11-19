import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import TVShow from "./TVShow";
import InfiniteScroll from "react-infinite-scroller";

function TVShowList(props) {
  const [data, setData] = useState([...props.shows]);
  const [page, setPage] = useState(2);
  function mapAllShows() {
    if (!!props.searchTerm) {
      return props.shows.map((s) => {
        if (s.name.toLowerCase().includes(props.searchTerm)) {
          return <TVShow show={s} key={s.id} selectShow={props.selectShow} />;
        }
      });
    }
    return props.shows.map((s) => (
      <TVShow show={s} key={s.id} selectShow={props.selectShow} />
    ));
  }

  return (
    <div className="TVShowList">
      <InfiniteScroll
        pageStart={0}
        // loadMore={loading}
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
