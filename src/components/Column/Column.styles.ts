import styled from "@emotion/styled";
import { borderRadius, dark1, light0 } from "../../theme";

export const S = {
  Column: styled.div`
    min-width: 275px;
    background-color: ${dark1};
    border-radius: ${borderRadius};
    padding: 20px;
    margin: 20px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  `,

  Title: styled.h1`
    text-align: center;
    font-size: 25px;
    color: ${light0};
  `,
};
