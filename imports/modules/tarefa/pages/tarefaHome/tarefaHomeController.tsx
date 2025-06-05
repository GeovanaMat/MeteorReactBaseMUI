import React from "react";
import { TarefaHomeContext } from "./tarefaHomeContext";
import TarefaHomeView from "./tarefaHomeView";
import { useNavigate } from "react-router-dom";
const TarefaHomeController = () => {


    return(
        <TarefaHomeContext.Provider value={{}}>
            <TarefaHomeView/>
        </TarefaHomeContext.Provider>
    )
}

export default TarefaHomeController;