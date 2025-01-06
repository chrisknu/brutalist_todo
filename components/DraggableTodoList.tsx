import React, { memo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Todo } from '../lib/types';
import { Button } from './ui/button';
import { CheckCircle2, Circle, Tag, Trash2 } from 'lucide-react';

interface Props {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  categories: any[];
}

const DroppableComponent = ({
  provided,
  todos,
  onToggle,
  onDelete,
  categories,
}: Props & { provided: any }) => (
  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
    {todos.map((todo, index) => (
      <Draggable key={todo.id} draggableId={`todo-${todo.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              flex items-center justify-between p-4 
              border-4 border-black dark:border-white
              ${todo.completed ? 'bg-black text-white' : 'bg-white text-black'}
              ${snapshot.isDragging ? 'opacity-50' : ''}
              cursor-move
              transition-all
            `}
          >
            <div className="flex items-center gap-4">
              <button onClick={() => onToggle(todo)} className="focus:outline-none">
                {todo.completed ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <div className="flex items-center gap-2">
                {todo.categoryId && (
                  <Tag
                    size={16}
                    style={{
                      color: categories.find((c) => c.id === todo.categoryId)?.color,
                    }}
                  />
                )}
                <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
                  {todo.text}
                </span>
              </div>
            </div>
            <Button
              onClick={() => onDelete(todo.id)}
              className={`
                rounded-none border-2 border-current p-2
                ${
                  todo.completed
                    ? 'text-white hover:bg-white hover:text-black'
                    : 'text-black hover:bg-black hover:text-white'
                }
              `}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        )}
      </Draggable>
    ))}
    {provided.placeholder}
  </div>
);

const MemoizedDraggableTodoList = memo(({ todos, onToggle, onDelete, categories }: Props) => {
  return (
    <Droppable droppableId="todo-list" type="todo">
      {(provided) => (
        <DroppableComponent
          provided={provided}
          todos={todos}
          onToggle={onToggle}
          onDelete={onDelete}
          categories={categories}
        />
      )}
    </Droppable>
  );
});

MemoizedDraggableTodoList.displayName = 'DraggableTodoList';

export const DraggableTodoList = MemoizedDraggableTodoList;
