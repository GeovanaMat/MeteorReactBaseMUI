import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const tarefaSch: ISchema<ITarefa> = {
	
	title: {
		type: String,
		label: 'Descrição da Tarefa',
		defaultValue: '',
		optional: false
	},
	description: {
		type: String,
		label: 'Detalhes da Tarefa',
		optional: true
	},
	publico: {
		type: Boolean,
		label: "Visibilidade Pública?",
		defaultValue: false,
		optional: true
	},
	statusConcluida: {
		type: Boolean,
		defaultValue: false,
		optional: true
	},
	creator: {
		type: String,
		defaultValue: '',
		optional: true
	}
};


export interface ITarefa extends IDoc {
	title: String;
	description: string;
	statusConcluida: boolean;
	creator: String | undefined;
	publico: boolean;
}
