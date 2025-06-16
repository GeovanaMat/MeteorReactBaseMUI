import React from 'react';

// Importando os componentes e ícones do Material-UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface ITarefaModalViewProps {
    titulo: String;
    descricao: String;
    tipo: boolean;
    criador?: String;
    checkStatus: boolean;
    onClickCheck: () => void;
    onClickEdit: () => void;
  }

const TarefaModalView = ({ titulo, descricao, tipo, criador,checkStatus,onClickCheck,onClickEdit }: ITarefaModalViewProps) => {                                                                                                                                                                                                                                                                                                                                                                   

  return (                              
    <Card 
      sx={{ 
        maxWidth: 600, 
        // margin: { xs: 2, sm: 'auto' }, 
        // mt: { sm: 4 },
        // borderRadius: 3, 
        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        // Alterações para scroll:
        padding: "0.5rem",
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: '90vh', sm: '80vh' }, // Altura máxima para o card
      }}
    >
      
      <Box sx={{ p: { xs: 2, sm: 3 }, pb: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2, 
          }}
        >
          <Typography 
            component="h1" 
            sx={{ 
              fontWeight: 400,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.4
            }}
          >
            {titulo}
          </Typography>
        </Box>
      </Box>

      {/* 2. CONTEÚDO (ROLÁVEL) */}
      <CardContent 
        sx={{
          // Alterações para scroll:
          flexGrow: 1, // Faz esta área crescer para ocupar o espaço
          overflowY: 'auto', // Adiciona scroll vertical SE necessário
          p: { xs: 2, sm: 3 },
          pt: 1
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Descrição
          </Typography>
          
        <Typography variant="body2" color="text.secondary" paragraph>
        {descricao}
        </Typography>
        
        </Box>
        <Box>
          <Typography variant="subtitle2" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Tipo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tipo == true ? "Publico" : "Pessoal"}
          </Typography>
        </Box>
      </CardContent>
      
      {/* 3. RODAPÉ (FIXO) */}
      <Box sx={{ p: { xs: 2, sm: 3 }, pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid #eee' }}>
        <Button 
          variant="outlined" 
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            width: { xs: '100%', sm: 'auto' },
            px: { xs: 3, sm: 6 },
          }}
          onClick={onClickEdit}
        >
          Editar
        </Button>
        <Typography variant="caption" sx={{ width: '100%', textAlign: 'right', mt: 2, color: 'text.disabled' }}>
          Criada por: {criador}
        </Typography>
      </Box>
    </Card>
  );
};

export default TarefaModalView;