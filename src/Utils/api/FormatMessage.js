// src/utils/formatMessage.js
import React from "react";
import ReactDOMServer from "react-dom/server";
import EmailTemplate from "../../components/EmailTemplate";

export function FormatMessage(data) {
  return ReactDOMServer.renderToStaticMarkup(<EmailTemplate data={data} />);
}
