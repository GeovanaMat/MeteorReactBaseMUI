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
import FormDialog from '/imports/ui/appComponents/showDialog/custom/formDialog/formDialog';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Drawer from '@mui/material/Drawer';
import AuthContext from '/imports/app/authProvider/authContext';
import { Pagination } from '@mui/material';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import TarefaModalView from '../../components/tarefaModalView';

const TarefaListView = () => {
	const controller = React.useContext(TarefaListControllerContext);
	const sysLayoutContext = React.useContext(SysAppLayoutContext);
	const userController = React.useContext(AuthContext);

	const navigate = useNavigate();
	const { Container, LoadingContainer, SearchContainer, TarefasContainer } = TarefaListStyles;
	const [open, setOpen] = React.useState(true);
	const [expandedAccordions, setExpandedAccordions] = React.useState({
		naoConcluidas: true,
		concluidas: false
	});

	const handleAccordionToggle =
		(panel: 'naoConcluidas' | 'concluidas') => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedAccordions((prev) => ({
				...prev,
				[panel]: isExpanded
			}));
		};

	const handleDrawerOpen = () => {
		setOpen(true);
		console.log('asdasd');
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Container>
			<Box width={'100%'}>
				<Tabs value={'Aba 1'} indicatorColor="secondary">
					<Tab label="Minhas Tarefas" value={'Aba 1'} />
				</Tabs>
			</Box>

			<Box width={'100%'} height={'100%'} sx={{ display: 'flex', flexDirection: 'row', marginTop: '2rem' }}>
				<TarefasContainer>
					<SearchContainer>
						<SysTextField
							name="search"
							placeholder="Procurar Tarefa(s)"
							onChange={controller.onChangeTextField}
							startAdornment={<SysIcon name={'search'} />}
						/>
					</SearchContainer>

					{controller.loading ? (
						<LoadingContainer>
							<CircularProgress />
							<Typography variant="body1">Aguarde, carregando informações...</Typography>
						</LoadingContainer>
					) : (
						<>
							<Box sx={{ width: '100%' }}>
								<Accordion
									sx={{ boxShadow: 'none', border: 'none', backgroundColor: 'transparent' }}
									expanded={expandedAccordions.naoConcluidas}
									onChange={handleAccordionToggle('naoConcluidas')}>
									<AccordionSummary
										sx={{ flexDirection: 'row-reverse', padding: '0px' }}
										expandIcon={<ExpandMoreIcon color="secondary" />}>
										<Typography component="span">Não Concluídas</Typography>
									</AccordionSummary>
									<AccordionDetails>
										{controller.todoList.filter((tarefa) => !tarefa.statusConcluida).length === 0 ? (
											<Typography>Não há tarefas pendentes</Typography>
										) : (
											<List>
												{controller.todoList
													.filter((tarefa) => !tarefa.statusConcluida)
													.map((tarefa, index, array) => (
														<React.Fragment key={tarefa._id}>
															<TarefaCard
																nomeTarefa={tarefa.title}
																criador={tarefa.creator}
																isChecked={tarefa.statusConcluida}
																onClickCheck={() => controller.onClickCheck(tarefa)}
																onEdit={() => {
																	if (userController.user?.username != tarefa.creator) {
																		sysLayoutContext.showNotification({
																			type: 'error',
																			title: 'Ação Inválida',
																			message: 'Você não tem permissão, entre em contato com o responsável da tarefa'
																		});
																		return;
																	}
																	navigate(`/tarefa/edit/${tarefa._id}`);
																}}
																onDelete={() => {
																	if (userController.user?.username != tarefa.creator) {
																		sysLayoutContext.showNotification({
																			type: 'error',
																			title: 'Ação Inválida',
																			message: 'Você não tem permissão, entre em contato com o responsável da tarefa'
																		});
																		return;
																	}

																	DeleteDialog({
																		showDialog: sysLayoutContext.showDialog,
																		closeDialog: sysLayoutContext.closeDialog,
																		title: `Excluir tarefa "${tarefa.title}"`,
																		message: `Tem certeza que deseja excluir a tarefa "${tarefa.title}" ?`,
																		onDeleteConfirm: () => {
																			controller.onDeleteButtonClick(tarefa);
																			sysLayoutContext.showNotification({
																				message: 'Excluído com sucesso!'
																			});
																		}
																	});
																}}
																onClick={() => {
																	console.log('Olá');
																	FormDialog({
																		showDialog: sysLayoutContext.showDialog,
																		closeDialog: sysLayoutContext.closeDialog,
																		form: (
																			<TarefaModalView
																				titulo={tarefa.title}
																				descricao={tarefa.description}
																				criador={tarefa.creator}
																				checkStatus={tarefa.statusConcluida}
																				tipo={tarefa.publico}
																				onClickCheck={() => controller.onClickCheck(tarefa)}
																				onClickEdit={() => {
																					if (userController.user?.username != tarefa.creator) {
																						sysLayoutContext.closeDialog();
																						sysLayoutContext.showNotification({
																							type: 'error',
																							title: 'Ação Inválida',
																							message:
																								'Você não tem permissão, entre em contato com o responsável da tarefa'
																						});
																						return;
																					}
																					sysLayoutContext.closeDialog();
																					navigate(`/tarefa/edit/${tarefa._id}`);
																				}}
																			/>
																		)
																	});
																}}
															/>
															{index < array.length - 1 && <Divider component="li" />}
														</React.Fragment>
													))}
											</List>
										)}
									</AccordionDetails>
								</Accordion>
							</Box>

							<Box sx={{ width: '100%' }}>
								<Accordion
									sx={{ boxShadow: 'none', border: 'none', backgroundColor: 'transparent' }}
									expanded={expandedAccordions.concluidas}
									onChange={handleAccordionToggle('concluidas')}>
									<AccordionSummary
										sx={{ flexDirection: 'row-reverse', padding: '0px' }}
										expandIcon={<ExpandMoreIcon color="secondary" />}>
										<Typography component="span">Concluídas</Typography>
									</AccordionSummary>
									<AccordionDetails>
										{controller.todoList.filter((tarefa) => tarefa.statusConcluida).length === 0 ? (
											<Typography>Não há tarefas concluídas</Typography>
										) : (
											<List>
												{controller.todoList
													.filter((tarefa) => tarefa.statusConcluida)
													.map((tarefa, index, array) => (
														<React.Fragment key={tarefa._id}>
															<TarefaCard
																nomeTarefa={tarefa.title}
																criador={tarefa.creator}
																isChecked={tarefa.statusConcluida}
																onEdit={() => {
																	if (userController.user?.username != tarefa.creator) {
																		sysLayoutContext.showNotification({
																			type: 'error',
																			title: 'Ação Inválida',
																			message: 'Você não tem permissão, entre em contato com o responsável da tarefa'
																		});
																		return;
																	}
																	navigate(`/tarefa/edit/${tarefa._id}`);
																}}
																onClickCheck={() => controller.onClickCheck(tarefa)}
																onDelete={() => {
																	DeleteDialog({
																		showDialog: sysLayoutContext.showDialog,
																		closeDialog: sysLayoutContext.closeDialog,
																		title: `Excluir dado ${tarefa.title}`,
																		message: `Tem certeza que deseja excluir a tarefa ${tarefa.title}?`,
																		onDeleteConfirm: () => {
																			controller.onDeleteButtonClick(tarefa);
																			sysLayoutContext.showNotification({
																				message: 'Excluído com sucesso!'
																			});
																		}
																	});
																}}
																onClick={() => {
																	console.log('Olá');
																	FormDialog({
																		showDialog: sysLayoutContext.showDialog,
																		closeDialog: sysLayoutContext.closeDialog,
																		form: (
																			<TarefaModalView
																				titulo={tarefa.title}
																				descricao={tarefa.description}
																				criador={tarefa.creator}
																				checkStatus={tarefa.statusConcluida}
																				tipo={tarefa.publico}
																				onClickCheck={() => controller.onClickCheck(tarefa)}
																				onClickEdit={() => {
																					if (userController.user?.username != tarefa.creator) {
																						sysLayoutContext.showNotification({
																							type: 'error',
																							title: 'Ação Inválida',
																							message:
																								'Você não tem permissão, entre em contato com o responsável da tarefa'
																						});
																						sysLayoutContext.closeDialog();
																						return;
																					}
																					sysLayoutContext.closeDialog();
																					navigate(`/tarefa/edit/${tarefa._id}`);
																				}}
																			/>
																		)
																	});
																}}
																//   isFirstTarefa={index === 0}
															/>
															{index < array.length - 1 && <Divider component="li" />}
														</React.Fragment>
													))}
											</List>
										)}
									</AccordionDetails>
								</Accordion>
							</Box>
						</>
					)}
				</TarefasContainer>
			</Box>

			{controller.totalPages > 1 && (
				<Box display="flex" justifyContent="center" mt={2}>
					<Pagination
						count={controller.totalPages}
						page={controller.currentPage}
						onChange={(event, value) => controller.setPage(value)}
						color="secondary"
					/>
				</Box>
			)}

			<SysFab
				variant="extended"
				text="Adicionar Tarefa"
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				sx={{ right: '45%', backgroundColor: 'white', color: "black", '&:hover': { color: 'white', backgroundColor: 'black' } }}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default TarefaListView;
