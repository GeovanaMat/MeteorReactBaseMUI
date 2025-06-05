import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function CustomDrawer() {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Box
				sx={{ width:'100%', display: open ? 'block' : 'none', height: '100%', p: '1rem', boxShadow: 4, transition: 'display 0.3s ease-in-out' }}>
				{/* Button de Ação */}
				<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
					<IconButton onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Box>

				{/* Titulo da Tarefa */}
				<Box></Box>

				{/* Descrição da Tarefa */}
				<Box></Box>
			</Box>
		</>
	);
}
