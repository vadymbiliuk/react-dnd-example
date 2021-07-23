import { FC } from "react";
import { S } from "./Column.styles";
import { useDrop } from "react-dnd";
import { ItemType, Status } from "../Container/Container.utils";
import { CardProps } from "../Card";

export type ColumnProps = {
  name: Status;
};

const Column: FC<ColumnProps> = ({ name, children }) => {
  const [_, drop] = useDrop(
    () => ({
      accept: ItemType,
      drop: () => ({ name }),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      canDrop: ({ currentColumnName }: CardProps) => {
        const fromTodoToDone =
          currentColumnName === Status.todo && name === Status.done;
        const fromDoneToTodo =
          currentColumnName === Status.done && name === Status.todo;
        const canDrop =
          currentColumnName === name || fromTodoToDone || fromDoneToTodo;

        return canDrop;
      },
    }),
    []
  );

  return (
    <S.Column ref={drop}>
      <S.Title>{name}</S.Title>
      {children}
    </S.Column>
  );
};
export { Column };
