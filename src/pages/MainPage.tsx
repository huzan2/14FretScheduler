import ExampleComp from "@components/ExampleComp";
import React from "react";

function MainPage(): React.JSX.Element {
  return (
    <div>
      <p className="text-3xl">Main Page</p>
      <ExampleComp />
    </div>
  );
}

export default MainPage;
