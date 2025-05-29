import React, { createContext, useCallback, useContext } from 'react';
import TarefaDetailView from './tarefaDetailView';
import { useNavigate } from 'react-router-dom';
import { TarefaModuleContext } from '../../tarefaContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { tarefaApi } from '../../api/tarefaApi';
import { ITarefa } from '../../api/tarefaSch';
import { ISchema } from '/imports/typings/ISchema';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import SysAppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface ITarefaDetailContollerContext {
	closePage: () => void;
	document: ITarefa;
	loading: boolean;
	schema: ISchema<ITarefa>;
	onSubmit: (doc: ITarefa) => void;
	changeToEdit: (id: string) => void;
}

export const TarefaDetailControllerContext = createContext<ITarefaDetailContollerContext>(
	{} as ITarefaDetailContollerContext
);

const TarefaDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(TarefaModuleContext);
	const { showNotification } = useContext(SysAppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? tarefaApi.subscribe('tarefaDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? tarefaApi.findOne({ _id: id }) : {};
		return {
			document: (document as ITarefa) ?? ({ _id: id } as ITarefa),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/tarefa/edit/${id}`);
	}, []);

	const onSubmit = useCallback((doc: ITarefa) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		tarefaApi[selectedAction](doc, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
				});
			} else {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	}, []);

	return (
		<TarefaDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: tarefaApi.getSchema(),
				onSubmit,
				changeToEdit
			}}>
			{<TarefaDetailView />}
		</TarefaDetailControllerContext.Provider>
	);
};

export default TarefaDetailController;
