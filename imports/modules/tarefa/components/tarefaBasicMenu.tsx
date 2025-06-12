import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface BasicMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const BasicMenu: React.FC<BasicMenuProps> = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
