import React from "react";

function TVShow(props) {
  // if (props.show !== undefined) {
  console.log(props.show);
  function handleSelectShow() {
    props.selectShow(props.show);
  }
  return (
    <div>
      <br />
      <img
        src={props.show.image.medium}
        onClick={handleSelectShow}
        alt="hello"
      />
    </div>
  );
  // }
}

export default TVShow;
