import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import BasicMenu from "./tarefaBasicMenu";

interface ITarefaCard {
    isFirstTarefa?: boolean,
    onClick?: () => void,
    onEdit: () => void;
    onDelete: () => void;
    isChecked?: boolean,
    nomeTarefa:String,
    criador: String | undefined,
    onClickCheck: () => void;
}

const TarefaCard: React.FC<ITarefaCard> = ({isFirstTarefa, onClick, isChecked, nomeTarefa, criador, onDelete, onEdit, onClickCheck}) => {

    
    return(
    <>
    <ListItem    sx={{display: 'flex', flexDirection: 'row'}}>
        <ListItemAvatar onClick={onClickCheck}>
        { isChecked ? <SysIcon name="checkCircle"/> : <RadioButtonUncheckedIcon/> }
        </ListItemAvatar>
        <ListItemText onClick={onClick} primary={nomeTarefa} secondary={`Criado por: ${criador}`} secondaryTypographyProps={{color: 'grey', fontSize:'10px'}}/>
        <BasicMenu onDelete={onDelete} onEdit={onEdit}/>
    </ListItem>
    </>
)
}
export default TarefaCard;