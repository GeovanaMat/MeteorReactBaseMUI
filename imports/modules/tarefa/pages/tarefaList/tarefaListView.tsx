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
import { Button } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Drawer from '@mui/material/Drawer';
import CustomDrawer from './CustomDrawer/CustomDrawer';
const TarefaListView = () => {
	const controller = React.useContext(TarefaListControllerContext);
	const sysLayoutContext = React.useContext(SysAppLayoutContext);
	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer, TarefasContainer } = TarefaListStyles;
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
		console.log('asdasd')
	  };
	
	  const handleDrawerClose = () => {
		setOpen(false);
	  };

	return (
		<Container>
			<Box width={'100%'}>
				<Box width={'100%'}>
					<Tabs value={'Aba 1'} indicatorColor="secondary">
						<Tab label="Minhas Tarefas" value={'Aba 1'} />
						<Tab label="Tarefas do Time" />
					</Tabs>
				</Box>
			</Box>

			<Box width={'100%'} height={'100%'}  sx={{display: 'flex', flexDirection: 'row'}}>
				<TarefasContainer>
					<SearchContainer>
						<SysTextField
							name="search"
							placeholder="Procurar Tarefa(s)"
							onChange={controller.onChangeTextField}
							startAdornment={<SysIcon name={'search'} />}
						/>
					</SearchContainer>

					<Box sx={{ width: '100%' }}>
						<Accordion sx={{ boxShadow: 'none', border: 'none', backgroundColor: 'transparent' }}>
							<AccordionSummary
								sx={{ flexDirection: 'row-reverse', padding: '0px' }}
								expandIcon={<ExpandMoreIcon color="secondary" />}>
								<Typography component="span">Não Concluídas</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Divider />
								<List>
									<TarefaCard
									// onClick={() => {return void}}
									/>
									<TarefaCard />
									<TarefaCard />
								</List>
							</AccordionDetails>
						</Accordion>
					</Box>

					<Box sx={{ width: '100%' }}>
						<Accordion sx={{ boxShadow: 'none', border: 'none',backgroundColor: 'transparent' }}>
							<AccordionSummary
								sx={{ flexDirection: 'row-reverse', padding: '0px' }}
								expandIcon={<ExpandMoreIcon color="secondary" />}>
								<Typography component="span">Concluídas</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Divider />
								<List>
									<TarefaCard />
									<TarefaCard />
									<TarefaCard />
								</List>
							</AccordionDetails>
						</Accordion>
					</Box>

					
						
					
				</TarefasContainer>
				
				<CustomDrawer/>

			</Box>

			<SysFab
				variant="extended"
				text="Adicionar Tarefa"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				sx={{ right: '45%', backgroundColor: 'white', '&:hover': { color: 'white', backgroundColor: 'black' } }}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default TarefaListView;
