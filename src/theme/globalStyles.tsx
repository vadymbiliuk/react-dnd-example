import { Global, css } from "@emotion/react";
import { FC } from "react";
import { dark0 } from "./colors";

export const GlobalTheme: FC = () => (
  <Global
    styles={css`
      body {
        background-color: ${dark0};
      }
    `}
  />
);
