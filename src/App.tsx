import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./components/Container";
import { GlobalTheme } from "./theme/globalStyles";

const App: FC = () => (
  <DndProvider backend={HTML5Backend}>
    <GlobalTheme />
    <Container />
  </DndProvider>
);

export { App };
