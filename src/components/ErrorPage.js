import React from "react";

function ErrorPage(props) {
  const { error } = props;
  const sanitizedHTML = { __html: error };

  return <div dangerouslySetInnerHTML={sanitizedHTML} />;
}

export default ErrorPage;
