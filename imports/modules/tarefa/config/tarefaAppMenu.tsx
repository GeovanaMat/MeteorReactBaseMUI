import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const tarefaMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/tarefa',
		name: 'Tarefa',
		icon: <SysIcon name={'dashboard'} />
	}
];
