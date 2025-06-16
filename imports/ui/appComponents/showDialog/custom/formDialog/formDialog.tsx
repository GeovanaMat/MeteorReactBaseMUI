import React, { ReactNode } from 'react';
import { IShowDialogProps } from '../../showDialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { formDialogStyles } from './formDialogStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import IconButton from '@mui/material/IconButton'; // <<< 1. Importe o IconButton
interface IFormDialogProps extends IShowDialogProps {
	showDialog: IAppLayoutContext['showDialog']
	closeDialog: IAppLayoutContext['closeDialog']
	onSubmit?: () => void;
	form?: ReactNode;
}

function FormDialog({ showDialog, closeDialog, onSubmit, title, form, ...props }: IFormDialogProps) {
	showDialog({
		...props,
		sx: formDialogStyles.box,
		header: (
			// O DialogTitle serve como container para o título e o botão
			<DialogTitle>
				{title}
				<IconButton
					aria-label="fechar"
					onClick={closeDialog}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.common.black, // Cor padrão para ícones de fechar
					}}
				>
					<SysIcon name={'close'} />
				</IconButton>
			</DialogTitle>
		),
		body: form,
		actions: (
			// <<< 2. O botão "Cancelar" foi removido daqui
			<DialogActions sx={formDialogStyles.actions}>
				{/* <Button
					startIcon={<SysIcon name={'check'} />}
					type="submit"
					variant="contained"
					onClick={() => {
						onSubmit?.();
					}}>
					Salvar
				</Button> */}
			</DialogActions>
		)
	});
}

export default FormDialog;

