import React, { useContext } from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import TarefaListController from '/imports/modules/tarefa/pages/tarefaList/tarefaListController';
import TarefaDetailController from '/imports/modules/tarefa/pages/tarefaDetail/tarefaDetailContoller';
import TarefaHomeView from './pages/tarefaHome/tarefaHomeView';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import TarefaHomeController from './pages/tarefaHome/tarefaHomeController';

export interface ITarefaModuleContext {
	state?: string;
	id?: string;
}

export const TarefaModuleContext = React.createContext<ITarefaModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, tarefaId } = useParams();
	const state = screenState ?? props.screenState;
	const id = tarefaId ?? props.id;
	

	const validState = ['view', 'edit', 'create', 'list'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <TarefaHomeController />;
		if(state && state == 'list') return <TarefaListController/>
		return <TarefaDetailController />;
	};

	const providerValue = {
		state,
		id,
		
	};
	return <TarefaModuleContext.Provider value={providerValue}>{renderPage()}</TarefaModuleContext.Provider>;
};
