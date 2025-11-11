import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { List, ListItem, Paper, Typography } from "@mui/material";

interface PreferenceSelectorProps {
  preferences: string[];
  onChange: (newOrder: string[]) => void;
}

export const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({ preferences, onChange }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newOrder = Array.from(preferences);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    onChange(newOrder);
  };

  return (
    <Paper sx={{ p: 3, mb: 3, border: '1.5px solid #e0eafc', background: '#f6f8fa' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#6a7ba2', fontWeight: 600, letterSpacing: 0.5 }}>Rank Your Preferences</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="preferences">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps} sx={{ p: 0 }}>
              {preferences.map((pref, idx) => (
                <Draggable key={pref} draggableId={pref} index={idx}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        mb: 1.5,
                        px: 2.5,
                        py: 1.5,
                        bgcolor: snapshot.isDragging ? '#e0eafc' : '#fff',
                        borderRadius: 2,
                        boxShadow: snapshot.isDragging ? 4 : 1,
                        border: '1px solid #e3e6f0',
                        fontWeight: 500,
                        color: '#4a4a4a',
                        fontSize: '1.08rem',
                        transition: 'background 0.2s, box-shadow 0.2s',
                        cursor: 'grab',
                        '&:hover': {
                          bgcolor: '#f0f4ff',
                          boxShadow: 2,
                        },
                      }}
                    >
                      {pref}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Paper>
  );
};
