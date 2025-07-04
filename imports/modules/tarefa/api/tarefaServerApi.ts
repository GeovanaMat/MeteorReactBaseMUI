// region Imports
import { Recurso } from '../config/recursos';
import { tarefaSch, ITarefa } from './tarefaSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
import { useContext } from 'react';
import AuthContext from '/imports/app/authProvider/authContext';

class TarefaServerApi extends ProductServerBase<ITarefa> {
	constructor() {
		super('tarefa', tarefaSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});
		const self = this;

		this.addTransformedPublication(
			'tarefaList',
			(filter = {}, options = {}) => {
				return this.defaultListCollectionPublication(filter, {
				  projection: {
					title: 1,
					type: 1,
					typeMulti: 1,
					createdat: 1,
					statusConcluida: 1,
					creator: 1,
					description: 1,
					publico: 1,
				  },
				  sort: options.sort,
				  skip: options.skip,
				  limit: options.limit
				});
			},
			(doc: ITarefa & { nomeUsuario: string }) => {
				const userProfileDoc = userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc, userProfileDoc };
			}
		);

		
		this.addPublication('tarefaDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					contacts: 1,
					title: 1,
					description: 1,
					type: 1,
					typeMulti: 1,
					date: 1,
					files: 1,
					chip: 1,
					statusRadio: 1,
					statusToggle: 1,
					slider: 1,
					check: 1,
					address: 1,
					creator: 1,
					publico: 1,
					statusConcluida: 1,

				}
			});
		});

		// this.addRestEndpoint(
		// 	'view',
		// 	(params, options) => {
		// 		console.log('Params', params);
		// 		console.log('options.headers', options.headers);
		// 		return { status: 'ok' };
		// 	},
		// 	['post']
		// );

		// this.addRestEndpoint(
		// 	'view/:tarefaId',
		// 	(params, _options) => {
		// 		console.log('Rest', params);
		// 		if (params.tarefaId) {
		// 			return self
		// 				.defaultCollectionPublication(
		// 					{
		// 						_id: params.tarefaId
		// 					},
		// 					{}
		// 				)
		// 				.fetch();
		// 		} else {
		// 			return { ...params };
		// 		}
		// 	},
		// 	['get']
		// );
	}
}

export const tarefaServerApi = new TarefaServerApi();
