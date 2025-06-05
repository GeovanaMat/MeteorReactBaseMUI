import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import  Box,{ BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface ITarefaListStyles {
	Container: ElementType<BoxProps>;
	LoadingContainer: ElementType<BoxProps>;
	SearchContainer: ElementType<BoxProps>;
	TarefasContainer: ElementType<BoxProps>;
}

const TarefaListStyles: ITarefaListStyles = {
	Container: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'flex-start',
		// alignItems: 'flex-start',
		width: '100%',
		height: '100%',
		overflow: 'auto',
		paddingLeft: '5rem',
		// gap: sysSizing.spacingFixedMd,
	})),
	LoadingContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: theme.spacing(2)
	})),
	SearchContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		maxWidth: '616px',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		}
	})),
	TarefasContainer: styled(Box)(({theme}) => ({
		width:  '100%',
	})),
	
};

export default TarefaListStyles;
