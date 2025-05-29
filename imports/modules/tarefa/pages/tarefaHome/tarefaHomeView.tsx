import React, {useContext} from "react";
import Styles from './tarefaHomeStyles'
import { Box, Button, List, Typography } from "@mui/material";
import AuthContext, { IAuthContext } from "/imports/app/authProvider/authContext";
import TarefaCard from "../../components/tarefaCard";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
const TarefaHomeView: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useContext<IAuthContext>(AuthContext);
    
    const handleNavigateTarefa =  () => navigate('/tarefa/list');
    return(
        <Styles.Container>
            <Styles.Content>
                <Box sx={{marginBottom: '1rem'}}>
                <Typography  variant="h2">Olá, { user ? user.username : 'Usuário'}</Typography>
                <Typography>Seus projetos muito mais organizados. Veja as taefas adicionadas por seu time, por você e para você!</Typography>
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

            <Button  onClick={handleNavigateTarefa} sx={{marginBottom: '0rem', borderRadius: '30px'}} variant="contained" endIcon={<KeyboardDoubleArrowRightIcon />}>
                    Ir para Tarefas
            </Button>

            
        </Styles.Container>
    )
}

export default TarefaHomeView;