import styled from "@emotion/styled";
import { borderRadius, dark2, light0 } from "../../theme";

export const S = {
  Card: styled.div<{ opacity?: number }>`
    background-color: ${dark2};
    opacity: ${(props) => props.opacity};
    color: ${light0};
    border-radius: ${borderRadius};
    padding: 10px;
    margin: 10px 0;
    text-align: center;
    line-height: 1;
    min-width: 275px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  `,
};
