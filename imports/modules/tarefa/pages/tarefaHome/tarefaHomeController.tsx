import React from "react";
import { TarefaHomeContext } from "./tarefaHomeContext";
import TarefaHomeView from "./tarefaHomeView";
const TarefaHomeController = () => {


    return(
        <TarefaHomeContext.Provider value={{}}>
            <TarefaHomeView/>
        </TarefaHomeContext.Provider>
    )
}

export default TarefaHomeController;