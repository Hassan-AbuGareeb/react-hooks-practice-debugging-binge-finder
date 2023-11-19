import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Adapter from "../Adapter";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";
import { lazy, Suspense } from "react";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");

  const TVShowList = lazy(() => import("./TVShowList"));

  useEffect(() => {
    const fetchData = async () => {
      const showItems = await Adapter.getShows(1);
      setShows([...showItems]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  function handleFilter(e) {
    console.log(e.target.value);
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      setSelectedShow(show);
      setEpisodes(episodes);
    });
  }

  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((s) => {
      return parseInt(s.rating.average) >= parseInt(filterByRating);
    });
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              episodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <Suspense fallback={<div>isLoading...</div>}>
            <TVShowList
              shows={displayShows}
              selectShow={selectShow}
              searchTerm={searchTerm}
            />
          </Suspense>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
