import React from 'react';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
  type DropTargetFeedbackArgs,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import type {
  DropTargetRecord,
  ElementDragType,
  BaseEventPayload,
} from '@atlaskit/pragmatic-drag-and-drop/types';
import { Button } from './ui/button';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Todo, Category } from '../lib/types';

interface Props {
  todos: Todo[];
  onReorder: (sourceIndex: number, destinationIndex: number) => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  categories: Category[];
}

interface DragData extends Record<string, unknown> {
  index: number;
  type: 'todo-item';
  itemId: number;
}

export const DraggableTodoList = ({ todos, onReorder, onToggle, onDelete, categories }: Props) => {
  const cleanupRefs = React.useRef<Array<() => void>>([]);

  React.useEffect(() => {
    const todoItems = document.querySelectorAll<HTMLElement>('[data-todo-item]');

    // Cleanup previous subscriptions
    cleanupRefs.current.forEach((cleanup) => cleanup());
    cleanupRefs.current = [];

    todoItems.forEach((item, index) => {
      const dragHandle = item.querySelector<HTMLElement>('[data-drag-handle]');
      if (!dragHandle) return;

      const cleanup = combine(
        // Make item draggable
        draggable({
          element: item,
          dragHandle,
          getInitialData: () => ({
            index,
            type: 'todo-item' as const,
            itemId: todos[index].id,
          }),
        }),
        // Add drop target behavior
        dropTargetForElements({
          element: item,
          getData: () => ({ index }),
          canDrop: (args: DropTargetFeedbackArgs) => args.source.data.type === 'todo-item',
          getIsSticky: () => true,
        }),
        // Monitor for drag operations
        monitorForElements({
          onDragStart: (args: BaseEventPayload<ElementDragType>) => {
            item.classList.add('opacity-50');
          },
          onDrag: (args: BaseEventPayload<ElementDragType>) => {
            const sourceIndex = args.source.data.index as number;
            const destinationElement = args.location.current.dropTargets[0];

            if (!destinationElement) {
              item.classList.remove('opacity-50');
              return;
            }

            const destinationIndex = Array.from(todoItems).indexOf(
              destinationElement.element as HTMLElement
            );
            if (sourceIndex !== destinationIndex) {
              onReorder(sourceIndex, destinationIndex);
              item.classList.remove('opacity-50');
            }
          },
        })
      );

      cleanupRefs.current.push(cleanup);
    });

    return () => {
      cleanupRefs.current.forEach((cleanup) => cleanup());
      cleanupRefs.current = [];
    };
  }, [todos, onReorder]);

  return (
    <div data-todo-list className="space-y-2">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          data-todo-item
          className="flex items-center justify-between p-4 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white transition-opacity duration-200"
        >
          <div className="flex items-center gap-4" data-drag-handle>
            <button
              onClick={() => onToggle(todo)}
              className="text-black dark:text-white hover:text-black/70 dark:hover:text-white/70"
            >
              {todo.completed ? <CheckCircle2 /> : <Circle />}
            </button>
            <span className={todo.completed ? 'line-through opacity-50' : ''}>{todo.text}</span>
          </div>
          <Button
            onClick={() => onDelete(Number(todo.id))}
            className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
