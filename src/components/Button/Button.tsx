/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, SerializedStyles } from "@emotion/react";
import {
  Button as SUIButton,
  ButtonProps as SUIButtonProps,
} from "semantic-ui-react";
import { space } from "styled-system";
import { fleurimondColors } from "../theme";

type ButtonVariation =
  | "primary"
  | "secondary"
  | "tertiary"
  | "urgentPrimary"
  | "urgentSecondary";

type ButtonSize = "small" | "medium" | "large" | any;

export interface VCButtonProps extends SUIButtonProps {
  variant?: ButtonVariation | any;
  size?: ButtonSize;
}

const baseButtonStyles = {
  borderRadius: "3px",
  borderStyle: "solid",
  borderWidth: "1px",
  cursor: "pointer",
  display: "inline-block",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  letterSpacing: "0.02em",
  lineHeight: 1,

  "&:hover,&:active,&:focus": {
    textDecoration: "none",
  },

  "&:disabled": {
    opacity: 1,
    pointerEvents: "none", // counterintuitive but this allows hover events to fire on disabled buttons (e.g. to show a tooltip) - https://jakearchibald.com/2017/events-and-disabled-form-fields/
  },
};

const buttonVariants = {
  primary: {
    color: fleurimondColors.white,
    backgroundColor: fleurimondColors.black,
    borderColor: fleurimondColors.black,

    "&:hover,&:active,&:focus": {
      backgroundColor: fleurimondColors.woooRed,
      borderColor: fleurimondColors.woooRed,
      color: fleurimondColors.white,
    },

    "&:disabled": {
      backgroundColor: fleurimondColors.foam,
      borderColor: fleurimondColors.foam,
      color: "#ecf0f3",
    },
  },

  secondary: {
    color: fleurimondColors.buttons.blue,
    backgroundColor: fleurimondColors.white,
    borderColor: fleurimondColors.buttons.blue,

    "&:hover,&:active,&:focus": {
      backgroundColor: "#edf1f5",
      borderColor: fleurimondColors.buttons.blue,
      color: fleurimondColors.buttons.blue,
    },

    "&:disabled": {
      backgroundColor: fleurimondColors.white,
      borderColor: fleurimondColors.buttons.lightBlue,
      color: fleurimondColors.buttons.lightBlue,
    },
  },

  tertiary: {
    color: fleurimondColors.white,
    backgroundColor: fleurimondColors.black,
    borderColor: fleurimondColors.black,

    "&:hover,&:active,&:focus": {
      backgroundColor: fleurimondColors.steelTeal,
      borderColor: fleurimondColors.steelTeal,
      color: fleurimondColors.white,
    },

    "&:disabled": {
      backgroundColor: fleurimondColors.foam,
      borderColor: fleurimondColors.steelTeal,
      color: fleurimondColors.steelTeal,
    },
  },

  urgentPrimary: {
    color: fleurimondColors.white,
    backgroundColor: fleurimondColors.fierceFuchsia,
    borderColor: fleurimondColors.fierceFuchsia,

    "&:hover,&:active,&:focus": {
      backgroundColor: "#6d1643",
      borderColor: "#6d1643",
      color: fleurimondColors.white,
    },

    "&:disabled": {
      backgroundColor: fleurimondColors.buttons.lightFuschia,
      borderColor: fleurimondColors.buttons.lightFuschia,
      color: "#f5f0f3",
    },
  },

  urgentSecondary: {
    color: fleurimondColors.fierceFuchsia,
    backgroundColor: fleurimondColors.white,
    borderColor: fleurimondColors.fierceFuchsia,

    "&:hover,&:active,&:focus": {
      backgroundColor: "#fdf4f9",
      borderColor: fleurimondColors.fierceFuchsia,
      color: fleurimondColors.fierceFuchsia,
    },

    "&:disabled": {
      backgroundColor: fleurimondColors.white,
      borderColor: fleurimondColors.buttons.lightFuschia,
      color: fleurimondColors.buttons.lightFuschia,
    },
  },
};

const buttonSizes = {
  small: {
    fontSize: "12px",
    padding: "6px 9px",
  },
  medium: {
    fontSize: "13px",
    padding: "8px 11px",
  },
  large: {
    fontSize: "18px",
    padding: "12px 14px",
    fontWeight: 700,
  },
};

const getButtonStyles = ({ variant, size }, props): SerializedStyles => {
  return css([
    baseButtonStyles,
    buttonSizes[size || "small"],
    buttonVariants[variant || "secondary"],
    space(props),
  ]);
};

const VCButton = (props: VCButtonProps): JSX.Element => {
  const { variant, onClick, size, ...rest } = props;

  return (
    <SUIButton
      type="submit"
      {...rest}
      css={getButtonStyles({ variant, size }, props)}
    />
  );
};

export default VCButton;
