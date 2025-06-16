import { TarefaHomeContext } from "./tarefaHomeContext";
import TarefaHomeView from "./tarefaHomeView";
import React, { useCallback, useContext, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { ITarefa } from '../../api/tarefaSch';
import { tarefaApi } from '../../api/tarefaApi';
import AuthContext from '/imports/app/authProvider/authContext';
import SysAppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
    sortProperties: { field: string; sortAscending: boolean };
    filter: Object;
    searchBy: string | null;
    viewComplexTable: boolean;

}

interface ITarefaHomeContollerContext {
    onAddButtonClick: () => void;
    onDeleteButtonClick: (row: any) => void;
    onClickCheck: (row:any) => void; 
    todoList: ITarefa[];
    schema: ISchema<any>;
    loading: boolean;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export const TarefaHomeControllerContext = React.createContext<ITarefaHomeContollerContext>(
    {} as ITarefaHomeContollerContext
);

const initialConfig = {
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {},
    searchBy: null,
    viewComplexTable: false
};

const TarefaHomeController = () => {
    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
    
        const { title, type, typeMulti } = tarefaApi.getSchema();
        const tarefaSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: 'Criado em' } };
        const { user } = useContext(AuthContext);
        const { showNotification } = useContext(SysAppLayoutContext);
        const [paginaAtual, setPaginaAtual] = React.useState(1);
        const tarefasPorPagina = 4;
    
        const navigate = useNavigate();
    
        const { sortProperties, filter } = config;
        const sort = {
            [sortProperties.field]: sortProperties.sortAscending ? 1 : -1
        };
    
        const { loading, tarefas, total } = useTracker(() => {
    
            const skip = (paginaAtual - 1) * tarefasPorPagina;
    
            const subHandle = tarefaApi.subscribe('tarefaList', {
                "$or": [
                  { "publico": true },
                  { "creator": user?.username }
                ]
              }, {
                sort,
                skip,
                limit: tarefasPorPagina
            });
            const tarefas = subHandle?.ready()
            ? tarefaApi.find(filter, { sort, skip, limit: tarefasPorPagina }).fetch()
            : [];
            return {
                tarefas,
                loading: !!subHandle && !subHandle.ready(),
                total: subHandle?.total || 0
            };
        }, [config,paginaAtual]);
    
        const onAddButtonClick = useCallback(() => {
            const newDocumentId = nanoid();
            navigate(`/tarefa/create/${newDocumentId}`);
        }, []);
    
        const setPage = useCallback((page: number) => {
            if (page < 1) return;
            setPaginaAtual(page);
        }, []);
        
        const totalPages = Math.ceil(total / tarefasPorPagina);
    
        const onDeleteButtonClick = useCallback((row: any) => {
            tarefaApi.remove(row);
        }, []);
    
        const onClickCheck = useCallback((row: any) => {
            row = {...row, statusConcluida: !row.statusConcluida};
            tarefaApi.update(row);
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
    
        const providerValues: ITarefaHomeContollerContext = useMemo(
            () => ({
                onAddButtonClick,
                onDeleteButtonClick,
                todoList: tarefas,
                schema: tarefaSchReduzido,
                loading,
                onChangeTextField,
                onChangeCategory: onSelectedCategory,
                onClickCheck: onClickCheck,
                currentPage: paginaAtual,
                totalPages,
                setPage,
            }),
            [tarefas, loading, paginaAtual,totalPages]
        );

    return(
        <TarefaHomeControllerContext.Provider value={providerValues}>
            <TarefaHomeView/>
        </TarefaHomeControllerContext.Provider>
    )
}

export default TarefaHomeController;