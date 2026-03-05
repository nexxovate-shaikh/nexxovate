"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";

type Lead = {
  id: string;
  Name: string;
  Email: string;
  status: "New" | "Contacted" | "Closed";
};

type Columns = {
  New: Lead[];
  Contacted: Lead[];
  Closed: Lead[];
};

export default function PipelinePage() {

  const [columns, setColumns] = useState<Columns>({
    New: [],
    Contacted: [],
    Closed: []
  });

  useEffect(() => {

    fetch("/api/contact/lead")
      .then(res => res.json())
      .then((data: any[]) => {

        const newLeads: Lead[] = [];
        const contacted: Lead[] = [];
        const closed: Lead[] = [];

        data.forEach((lead, i) => {

          const item: Lead = {
            id: i.toString(),
            Name: lead.Name,
            Email: lead.Email,
            status: lead.status ?? "New"
          };

          if (item.status === "Contacted") contacted.push(item);
          else if (item.status === "Closed") closed.push(item);
          else newLeads.push(item);

        });

        setColumns({
          New: newLeads,
          Contacted: contacted,
          Closed: closed
        });

      });

  }, []);

  function onDragEnd(result: DropResult) {

    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId as keyof Columns;
    const destCol = destination.droppableId as keyof Columns;

    const sourceItems = [...columns[sourceCol]];
    const destItems = [...columns[destCol]];

    const [moved] = sourceItems.splice(source.index, 1);

    moved.status = destCol;

    destItems.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [sourceCol]: sourceItems,
      [destCol]: destItems
    });

  }

  return (

    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-gray-800">
          Sales Pipeline
        </h1>

        <div className="text-sm text-gray-500">
          Drag leads between stages
        </div>

      </div>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="grid grid-cols-3 gap-8">

          {Object.entries(columns).map(([status, leads]) => (

            <Droppable droppableId={status} key={status}>

              {(provided) => (

                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-2xl shadow-md p-6 min-h-[500px]"
                >

                  <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    {status}
                  </h2>

                  <div className="space-y-4">

                    {leads.map((lead, index) => (

                      <Draggable
                        key={lead.id}
                        draggableId={lead.id}
                        index={index}
                      >

                        {(provided) => (

                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition"
                          >

                            <p className="font-semibold text-gray-800">
                              {lead.Name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {lead.Email}
                            </p>

                          </div>

                        )}

                      </Draggable>

                    ))}

                    {provided.placeholder}

                  </div>

                </div>

              )}

            </Droppable>

          ))}

        </div>

      </DragDropContext>

    </div>
  );
}