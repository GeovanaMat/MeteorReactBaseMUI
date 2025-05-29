import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { TarefaListControllerContext } from './tarefaListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import SysAppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import TarefaListStyles from './tarefaListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { Accordion, AccordionDetails, AccordionSummary, Divider, List, Tab, Tabs, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TarefaCard from '../../components/tarefaCard';

const TarefaListView = () => {
	const controller = React.useContext(TarefaListControllerContext);
	const sysLayoutContext = React.useContext(SysAppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer } = TarefaListStyles;

	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.type.options?.() ?? [])];

	return (
		<Container>
			<Box width={'100%'}>
				<Tabs value={'Aba 1'} indicatorColor="secondary">
					<Tab label="Minhas Tarefas" value={'Aba 1'} />
					<Tab label="Tarefas do Time" />
				</Tabs>
			</Box>

			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Procurar Tarefa(s)"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
			</SearchContainer>

			<Box sx={{ width: '100%' }}>
				<Accordion  sx={{ boxShadow: 'none', border: 'none' }}>
					<AccordionSummary sx={{ flexDirection: 'row-reverse',padding: '0px' }} expandIcon={<ExpandMoreIcon  color='secondary'/>} >
						<Typography component="span">Não Concluídas</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Divider/>
						<List>
						<TarefaCard/>
						<TarefaCard/>
						<TarefaCard/>
						</List>
						
					</AccordionDetails>
				</Accordion>
			</Box>

			<Box sx={{ width: '100%' }}>
				<Accordion  sx={{ boxShadow: 'none', border: 'none' }}>
					<AccordionSummary sx={{ flexDirection: 'row-reverse',padding: '0px' }} expandIcon={<ExpandMoreIcon  color='secondary'/>} >
						<Typography component="span">Concluídas</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Divider/>
						<List>
						<TarefaCard/>
						<TarefaCard/>
						<TarefaCard/>
						</List>
						
					</AccordionDetails>
				</Accordion>
			</Box>

			<SysFab
				variant="extended"
				text="Adicionar Tarefa"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				sx={{right: '45%'}}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default TarefaListView;
