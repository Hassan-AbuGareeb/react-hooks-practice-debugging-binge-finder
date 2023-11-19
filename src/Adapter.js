class Adapter {
  static async getShows(page) {
    return await fetch(`https://api.tvmaze.com/shows?page=${page}`).then(
      (res) => res.json()
    );
  }

  static async getShowEpisodes(showID) {
    return await fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
      .then((res) => res.json())
      .then((data) => data);
  }
}

export default Adapter;
