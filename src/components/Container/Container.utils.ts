import data from "../../tasks.json";

// | Enums
export enum Status {
  todo = "todo",
  done = "done",
}

// | Helper for taking task element type
type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// | Reusable types

export type Task = ArrayElement<typeof data.tasks>;

// | ItemType for react-dnd library usage
export const ItemType = Symbol("Card");
