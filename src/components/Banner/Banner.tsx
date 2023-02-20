/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { space, flexbox, typography } from "styled-system";
import { Container } from "semantic-ui-react";
import { Header } from "../Header";

import { fleurimondColors } from "../theme";

const baseBannerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  boxSizing: "border-box",
  fontSize: "20px",
  backgroundImage:
    "linear-gradient(90deg, rgba(27, 70, 119, 0.5), rgba(255, 204, 51, 0.316)), url('https://bpldcassets.blob.core.windows.net/derivatives/images/commonwealth:x633fc71j/image_access_800.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  padding: "10px",
  margin: " 0 0 20px 0",

  img: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "right",
    paddingLeft: "250px",
  },
  "*": {
    fontFamily: "Montserrat, sans-serif",
  },
  ".header": {
    color: "white",
    fontSize: "10rem",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "none",
    padding: "22px",
  },
});

const ProGridBanner = (props): JSX.Element => {
  return (
    <Container {...props}>
      <div>
        <Header className="header" as="h1" pt={200} pl={100}>
          ProGrid
        </Header>
      </div>
    </Container>
  );
};

const ProGridBannerWithStyle = styled(ProGridBanner, {
  shouldForwardProp,
})(baseBannerStyles, space, flexbox, typography);

export default ProGridBannerWithStyle;
