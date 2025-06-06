import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import BasicMenu from "./tarefaBasicMenu";

interface ITarefaCard {
    isFirstTarefa?: boolean,
    onClick?: () => void,
}

const TarefaCard: React.FC<ITarefaCard> = ({isFirstTarefa, onClick}) => {

    const isChecked = false;
    
    return(
    <>
    <Box width={'100%'} onClick={onClick}>
    {isFirstTarefa ? <Divider/> : <></> }
    <ListItem divider  sx={{display: 'flex', flexDirection: 'row'}}>
        <ListItemAvatar>
        { isChecked ? <SysIcon name="checkCircle"/> : <RadioButtonUncheckedIcon/> }
        </ListItemAvatar>
        
        <ListItemText primary={'Nome da Tarefa'} secondary={'Criado por: Você'} secondaryTypographyProps={{color: 'grey', fontSize:'10px'}}/>
        <BasicMenu/>
    </ListItem>
    
    </Box>
    
    </>
)
}
export default TarefaCard;