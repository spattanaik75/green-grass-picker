import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { List, ListItem, Typography, Box } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  preferenceTitleStyles,
  preferenceLabelStyles,
  listStyles,
  getListItemStyles,
  dragIconStyles,
  itemContentBoxStyles,
  itemTextStyles,
  getPriorityBadgeStyles,
  getPriorityLabel,
} from "../styles/preferenceSelectorStyles";

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
      <Typography variant="h6" sx={preferenceTitleStyles}>
        Rank Your Preferences
        <Typography component="span" variant="caption" sx={preferenceLabelStyles}>
          Drag to reorder
        </Typography>
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="preferences">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps} sx={listStyles}>
              {preferences.map((pref, idx) => (
                <Draggable key={pref} draggableId={pref} index={idx}>
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={getListItemStyles(snapshot.isDragging)}
                    >
                      <DragIndicatorIcon sx={dragIconStyles} />
                      <Box sx={itemContentBoxStyles}>
                        <Typography variant="body1" sx={itemTextStyles}>
                          {pref}
                        </Typography>
                        {idx < 3 && (
                          <Box sx={getPriorityBadgeStyles(idx)}>
                            {getPriorityLabel(idx)}
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
