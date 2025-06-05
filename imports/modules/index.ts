import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Example from './example/config';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';
import Tarefa from './tarefa/config'

const pages: Array<IRoute | null> = [
	...Example.pagesRouterList, 
	...Aniversario.pagesRouterList, 
	...UserProfile.pagesRouterList,
	...Tarefa.pagesRouterList
];

const menuItens: Array<IAppMenu | null> = [
	//...UserProfile.pagesMenuItemList,
	...Tarefa.pagesMenuItemList,
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
