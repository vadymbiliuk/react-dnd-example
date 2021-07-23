import { FC, useCallback, useState } from "react";
import { Column } from "../Column";
import { S } from "./Container.styles";
import data from "../../tasks.json";
import { Status, Task } from "./Container.utils";
import { Card } from "../Card";

const Container: FC = () => {
  const [tasks, setTasks] = useState(data.tasks);

  const filterByStatus = useCallback(
    (status: string) => (x: Task) => x.status === status,
    []
  );

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = tasks[dragIndex];

      if (dragItem) {
        setTasks((prevState) => {
          const coppiedStateArray = [...prevState];

          // remove item by "hoverIndex" and put "dragItem" instead
          const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

          // remove item by "dragIndex" and put "prevItem" instead
          coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

          return coppiedStateArray;
        });
      }
    },
    [tasks]
  );

  const getColumnItems = useCallback(
    (status: Status) =>
      tasks
        .filter(filterByStatus(status))
        .map((task, index) => (
          <Card
            key={task.title}
            title={task.title}
            currentColumnName={status}
            setItems={setTasks}
            index={index}
            handleMoveCard={handleMoveCard}
          />
        )),
    [tasks, filterByStatus, handleMoveCard]
  );

  return (
    <S.Container>
      <Column name={Status.todo}>{getColumnItems(Status.todo)}</Column>
      <Column name={Status.done}>{getColumnItems(Status.done)}</Column>
    </S.Container>
  );
};

export { Container };
