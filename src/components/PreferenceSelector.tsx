import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { List, ListItem, Typography, Box } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

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
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: '#4a4a4a', fontWeight: 600, letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        Rank Your Preferences
        <Typography component="span" variant="caption" sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 500, background: (theme) => theme.palette.primary.light, px: 1.5, py: 0.5, borderRadius: 2 }}>
          Drag to reorder
        </Typography>
      </Typography>
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
                        bgcolor: snapshot.isDragging ? (theme) => theme.palette.primary.light : '#fff',
                        borderRadius: 3,
                        boxShadow: snapshot.isDragging ? '0 4px 16px rgba(163, 201, 199, 0.25)' : '0 1px 4px rgba(163, 201, 199, 0.10)',
                        border: '1px solid',
                        borderColor: snapshot.isDragging ? (theme) => theme.palette.primary.main : (theme) => theme.palette.primary.light,
                        fontWeight: 500,
                        color: '#4a4a4a',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'grab',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        '&:hover': {
                          bgcolor: (theme) => theme.palette.primary.light + '30',
                          boxShadow: '0 2px 8px rgba(163, 201, 199, 0.15)',
                          transform: 'translateY(-1px)',
                        },
                        '&:active': {
                          cursor: 'grabbing',
                        },
                      }}
                    >
                      <DragIndicatorIcon sx={{ color: (theme) => theme.palette.primary.main, opacity: 0.6, fontSize: '1.2rem' }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#4a4a4a' }}>
                          {pref}
                        </Typography>
                        {idx < 3 && (
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 2,
                              background: idx === 0 ? 'linear-gradient(135deg, #ffd89b 0%, #ffb347 100%)' : idx === 1 ? 'linear-gradient(135deg, #c9e4de 0%, #a3c9c7 100%)' : 'linear-gradient(135deg, #e0c3fc 0%, #d4a5ff 100%)',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: '#2d3a3a',
                            }}
                          >
                            {idx === 0 ? 'High Priority' : idx === 1 ? 'Medium' : 'Normal'}
                          </Box>
                        )}
                      </Box>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
