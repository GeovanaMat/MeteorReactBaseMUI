import TarefaContainer from '../tarefaContainer';
import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';

export const tarefaRouterList: (IRoute | null)[] = [
	{
		path: '/tarefa/:screenState/:tarefaId',
		component: TarefaContainer,
		isProtected: true,
		resources: [Recurso.TAREFA_VIEW]
	},
	{
		path: '/tarefa/:screenState',
		component: TarefaContainer,
		isProtected: true,
		resources: [Recurso.TAREFA_CREATE]
	},
	{
		path: '/',
		component: TarefaContainer,
		isProtected: true,
		resources: [Recurso.TAREFA_VIEW]
	},
	{
		path: '/tarefa',
		component: TarefaContainer,
		isProtected: true,
		resources: [Recurso.TAREFA_VIEW]
	}
];
