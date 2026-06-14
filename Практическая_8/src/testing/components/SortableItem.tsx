import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableItemProps {
    item: string;
    highlight?: 'correct' | 'wrong' | 'none';
}

export function SortableItem({ item, highlight = 'none' }: SortableItemProps) {
    const id = item;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const borderColor =
        highlight === 'correct' ? '#48cc4c' :
        highlight === 'wrong'   ? '#e8584e' :
        'grey';

    const bgColor =
        highlight === 'correct' ? 'rgba(76,175,80,0.08)' :
        highlight === 'wrong'   ? 'rgba(244,67,54,0.08)' :
        'transparent';

    return (
        <ListItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ListItemButton sx={{ border: `1px solid ${borderColor}`, borderRadius: '5px', bgcolor: bgColor }}>
                <ListItemIcon>
                    <DragIndicatorIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    );
}