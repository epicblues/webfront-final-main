import React, { FunctionComponent } from "react";
import Meta from "../components/Meta";

const about: FunctionComponent = (props) => {
  console.log(props);
  return (
    <div>
      <Meta title="About" />
      about
    </div>
  );
}


export default about;
