import React from 'react';
import {ISysTemplateProps} from '../getTemplate';
import {Box, BoxProps, IconButton, Typography} from '@mui/material';
import TemplateAppBarStyles from './templateAppBarStyles';
import SysAppBar from '../components/sysAppBar/sysAppBarController';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // ícone de seta
export interface ITemplateAppBar extends ISysTemplateProps {
  containerProps?: BoxProps;
  logo?: React.ReactNode;
}

export const TemplateAppBar: React.FC<ITemplateAppBar> = ({
  children,
  menuOptions,
  logo,
  containerProps
}) => {

  const location = useLocation();
  const navigate = useNavigate();

  const isOnTarefaList = location.pathname === '/tarefa/list';

  return (
    <TemplateAppBarStyles.container>
      <SysAppBar logo={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isOnTarefaList && (
              <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }} color="inherit">
                <ArrowBackIcon />
              </IconButton>
            )}
            {logo ?? <BoilerplateLogo />}
          </Box>
        } menuOptions={menuOptions} />
      <TemplateAppBarStyles.contentWrapper>
        <TemplateAppBarStyles.contentContainer {...containerProps}>
          {children}
        </TemplateAppBarStyles.contentContainer>
      </TemplateAppBarStyles.contentWrapper>
    </TemplateAppBarStyles.container>
  );
};

const BoilerplateLogo: React.FC = () => {
	return (
		<Typography
			variant="subtitle1"
			color={(theme) => theme.palette.sysText?.tertiary}
			sx={{ display: 'flex', alignItems: 'center' }}>
			<Typography color={(theme) => theme.palette.primary.contrastText} variant="h2" >
				ToDo List
			</Typography>
		
		</Typography>
	);
};
