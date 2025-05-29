import React, { useCallback, useMemo } from 'react';
import TarefaListView from './tarefaListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { ITarefa } from '../../api/tarefaSch';
import { tarefaApi } from '../../api/tarefaApi';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface ITarefaListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: ITarefa[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TarefaListControllerContext = React.createContext<ITarefaListContollerContext>(
	{} as ITarefaListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const TarefaListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);

	const { title, type, typeMulti } = tarefaApi.getSchema();
	const tarefaSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, tarefas } = useTracker(() => {
		const subHandle = tarefaApi.subscribe('tarefaList', filter, {
			sort
		});
		const tarefas = subHandle?.ready() ? tarefaApi.find(filter, { sort }).fetch() : [];
		return {
			tarefas,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : tarefas.length
		};
	}, [config]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/tarefa/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		tarefaApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);

	const providerValues: ITarefaListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			todoList: tarefas,
			schema: tarefaSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory
		}),
		[tarefas, loading]
	);

	return (
		<TarefaListControllerContext.Provider value={providerValues}>
			<TarefaListView />
		</TarefaListControllerContext.Provider>
	);
};

export default TarefaListController;
