import ExampleComp from "@components/ExampleComp";
import React from "react";

function ErrorPage(): React.JSX.Element {
  return (
    <div>
      <h1>Oops!</h1>
      <p>존재하지 않는 페이지입니다.</p>
      <ExampleComp />
    </div>
  );
}

export default ErrorPage;
