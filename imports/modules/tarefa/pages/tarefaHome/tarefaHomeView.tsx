import React, {useContext} from "react";
import Styles from './tarefaHomeStyles'
import { Box, Button, List, Typography } from "@mui/material";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import TarefaCard from "../../components/tarefaCard";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

const TarefaHomeView: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useContext<IAuthContext>(AuthContext);
    
    const handleNavigateTarefa =  () => navigate('/tarefa/list');
    return(
        <Styles.Container>
            <Styles.Content>
                <Box sx={{marginBottom: '1rem'}}>
                <Typography  variant="h2">Olá, { user ? user.username : 'Usuário'}</Typography>
                <Typography>Seus projetos muito mais organizados. Veja as tarefas adicionadas por seu time, por você e para você!</Typography>
                </Box>
                
                <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Typography sx={{fontWeight: 'bold', paddingRight: '3rem', width: '400px'}}  >Adicionadas recentemente</Typography>
                <TarefaCard isFirstTarefa={true}/>
                </Box>

                <List>
                <TarefaCard/>
                <TarefaCard/>
                <TarefaCard/>
                <TarefaCard/>
                </List>

                
            </Styles.Content>


            <SysFab
                        
            variant="extended"
            text="Ir para Tarefas"
            startIcon={<SysIcon name={'add'} />}
            fixed={true}
            sx={{ right: '45%',backgroundColor: 'white', '&:hover': {color: 'white', backgroundColor: 'black'}}}
            onClick={handleNavigateTarefa}
                        />

            
        </Styles.Container>
    )
}

export default TarefaHomeView;