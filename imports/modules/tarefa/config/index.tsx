import { tarefaRouterList } from './tarefaRouters';
import { tarefaMenuItemList } from './tarefaAppMenu';
import { IModuleHub } from '../../modulesTypings';

const Tarefa: IModuleHub = {
	pagesRouterList: tarefaRouterList,
	pagesMenuItemList: tarefaMenuItemList
};

export default Tarefa;
