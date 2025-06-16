import React, { useContext } from 'react';
import Styles from './tarefaHomeStyles';
import { Box, Button, List, Typography } from '@mui/material';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import TarefaCard from '../../components/tarefaCard';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { TarefaHomeControllerContext } from '../tarefaHome/tarefaHomeController';
import SysAppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import TarefaModalView from '../../components/tarefaModalView';
import FormDialog from '/imports/ui/appComponents/showDialog/custom/formDialog/formDialog';

const TarefaHomeView: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useContext<IAuthContext>(AuthContext);
	const controller = useContext(TarefaHomeControllerContext);
	const handleNavigateTarefa = () => navigate('/tarefa/list');
	const sysLayoutContext = React.useContext(SysAppLayoutContext);
	const userController = React.useContext(AuthContext);
	return (
		<Styles.Container>
			<Styles.Content>
				<Box>
					<Typography variant="h2">Olá, {user ? user.username : 'Usuário'}</Typography>
					<Typography>
						Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography sx={{ fontWeight: 'bold', paddingRight: '3rem', width: '400px' }}>
						Adicionadas recentemente
					</Typography>
					{/* Exibe a primeira tarefa se existir */}
					{controller.todoList?.length > 0 && (
						<TarefaCard
							nomeTarefa={controller.todoList[0].title}
							criador={controller.todoList[0].creator}
							isFirstTarefa={true}
							onClickCheck={() => controller.onClickCheck(controller.todoList[0])}
							isChecked={controller.todoList[0].statusConcluida}
							onEdit={() => {
								if (userController.user?.username != controller.todoList[0].creator) {
									sysLayoutContext.showNotification({
										type: 'error',
										title: 'Ação Inválida',
										message: 'Você não tem permissão, entre em contato com o responsável da tarefa'
									});
									return;
								}
								navigate(`/tarefa/edit/${controller.todoList[0]._id}`);
							}}
							onDelete={() => {
								if (userController.user?.username != controller.todoList[0].creator) {
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
									title: `Excluir tarefa "${controller.todoList[0].title}"`,
									message: `Tem certeza que deseja excluir a tarefa "${controller.todoList[0].title}" ?`,
									onDeleteConfirm: () => {
										controller.onDeleteButtonClick(controller.todoList[0]);
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
											titulo={controller.todoList[0].title}
											descricao={controller.todoList[0].description}
											criador={controller.todoList[0].creator}
											checkStatus={controller.todoList[0].statusConcluida}
											tipo={controller.todoList[0].publico}
											onClickCheck={() => controller.onClickCheck(controller.todoList[0])}
											onClickEdit={() => {
												if (userController.user?.username != controller.todoList[0].creator) {
													console.log(userController.user?.username, "  ", controller.todoList[0].creator )
													sysLayoutContext.showNotification({
														type: 'error',
														title: 'Ação Inválida',
														message: 'Você não tem permissão, entre em contato com o responsável da tarefa'
													});
													return;
												}
												sysLayoutContext.closeDialog();
												navigate(`/tarefa/edit/${controller.todoList[0]._id}`);
											}}
										/>
									)
								});
							}}
						/>
					)}
				</Box>

				<List>
					{controller.todoList?.slice(1, 4).map((tarefa, index) => (
						<TarefaCard
							key={tarefa._id || index}
							nomeTarefa={tarefa.title}
							criador={tarefa.creator}
							onClickCheck={() => controller.onClickCheck(tarefa)}
							isChecked={tarefa.statusConcluida}
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
									title: `Excluir tarefa "${controller.todoList[0].title}"`,
									message: `Tem certeza que deseja excluir a tarefa "${controller.todoList[0].title}" ?`,
									onDeleteConfirm: () => {
										controller.onDeleteButtonClick(controller.todoList[0]);
										sysLayoutContext.showNotification({
											message: 'Excluído com sucesso!'
										});
									}
								});
							}}
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
														message: 'Você não tem permissão, entre em contato com o responsável da tarefa'
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
					))}
				</List>
			</Styles.Content>

			<SysFab
				variant="extended"
				text="Ir para Tarefas"
				startIcon={<SysIcon name={'arrowForward'} />}
				fixed={true}
				sx={{ right: '45%', backgroundColor: 'white', color: "black", '&:hover': { color: 'white', backgroundColor: 'black' } }}
				onClick={handleNavigateTarefa}
			/>
		</Styles.Container>
	);
};

export default TarefaHomeView;
