/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Header as ProgridHeader,
  HeaderProps as ProgridSUIHeaderProps,
} from "semantic-ui-react";
import { jsx, css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
import { space } from "styled-system";
import { fleurimondColors } from "../theme";

export interface ProgridHeaderProps extends ProgridSUIHeaderProps {
  as?: string;
  content?: React.ReactNode;
}

const baseHeaderStyles = css({
  fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
  textColor: fleurimondColors.orneryOrange,
  lineHeight: "normal",
  fontWeight: 600,
  margin: 0,
});

const header1 = css({
  fontSize: "25px",
});

const header2 = css({
  fontSize: "16px",
});

const header3 = css({
  fontSize: "13px",
});

const headerStyle = (props: any): SerializedStyles => {
  switch (props.as) {
    case "h1":
      return header1;
    case "h2":
      return header2;
    case "h3":
      return header3;
    case "h4":
      return header3;
    case "h5":
      return header3;
    case "h6":
      return header3;
    default:
      return header1;
  }
};

const ProgridHeaders = (props: ProgridHeaderProps): JSX.Element => {
  return <ProgridHeader {...props} />;
};

const ProgridHeaderWithStyle = styled(ProgridHeaders, {
  shouldForwardProp,
})(baseHeaderStyles, headerStyle, space);

export default ProgridHeaderWithStyle;
