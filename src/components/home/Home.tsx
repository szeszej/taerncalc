//React
import React from "react";

//i18l
import { withTranslation } from "react-i18next";

function ConnectedHome(props: PropTypes) {
  const { t } = props;
  return (
    <div className="home">
      <div className="intro">
        <h2>Taern je fajny</h2>
      </div>
    </div>
  );
}

export const Home = withTranslation()(ConnectedHome);

interface PropTypes {
  t(string: string): string;
}
