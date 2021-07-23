import { Dispatch, FC, SetStateAction, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemType, Status, Task } from "../Container/Container.utils";
import { S } from "./Card.styles";

export type DragObject = {
  title: string;
  currentColumnName: Status;
  index: number;
  type: typeof ItemType;
};
export type DropResult = {
  name: string;
  dropEffect: string;
};

export type CardProps = {
  title: Task["title"];
  currentColumnName: Status;
  setItems: Dispatch<SetStateAction<Task[]>>;
  index: number;
  handleMoveCard: (dragIndex: number, hoverIndex: number) => void;
};

const Card: FC<CardProps> = ({
  title,
  currentColumnName,
  setItems,
  index,
  handleMoveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const changeItemColumn = (currentItem: { title: string }, status: Status) => {
    setItems((prevState) =>
      prevState.map((item) => ({
        ...item,
        status: item.title === currentItem.title ? status : item.status,
      }))
    );
  };

  const [_, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = Number(clientOffset?.y) - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      handleMoveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    DragObject,
    DropResult,
    { isDragging: boolean }
  >({
    type: ItemType,
    item: { index, title, currentColumnName, type: ItemType },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();

      if (dropResult) {
        const { name } = dropResult;

        switch (name) {
          case Status.todo:
            changeItemColumn(item, Status.todo);
            break;
          case Status.done:
            changeItemColumn(item, Status.done);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <S.Card ref={ref} opacity={opacity}>
      {title}
    </S.Card>
  );
};

export { Card };
