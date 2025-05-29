import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import { sysSizing } from '/imports/ui/materialui/styles';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		signIn(email, password, (err) => {
			if (!err) navigate('/');
			showNotification({
				type: 'error',
				title: 'Erro ao tentar logar',
				message: 'Email ou senha inválidos',
			});
			console.log(err?.details)
		});
;	};

	const handleForgotPassword = () => navigate('/signin'); //navigate('/password-recovery');
	const handleSingUp = () => navigate('/signup')
	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	return (
		<Container>
			<Content>
				

				<FormContainer>
				<Typography variant="h1" display={'inline-flex'} gap={1} sx={{color: 'black'}}>
					ToDo List
				</Typography>
					<Typography variant='body1' sx={{color: 'black'}}>Boas-vindas a sua lista de tarefas.</Typography>
					<Typography variant='body1' sx={{color: 'black'}}>Insira seu e-mail e senha para efetuar o login:</Typography>
					<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
							
							<Box />
							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
								Entrar
							</SysFormButton>
						</FormWrapper>
						<Box sx={{padding: '1.5rem'}}  />
						<Box  sx={{ display: 'flex', flexDirection: 'row', gap: sysSizing.spacingFixedSm }} >
								Esqueceu sua senha? <Typography variant="link" sx={{cursor:'pointer'}} onClick={handleForgotPassword}>Clique aqui</Typography>
						</Box>
						<Box  sx={{ display: 'flex', flexDirection: 'row', gap: sysSizing.spacingFixedSm }} >
								Novo por aqui? <Typography variant="link" sx={{cursor:'pointer'}} onClick={handleSingUp}>Cadastre-se</Typography>
						</Box>
					</SysForm>
				</FormContainer>

				<Box component="img" src="/images/icons-192.png" sx={{ width: '100%', maxWidth: '50px' }} />
			</Content>
		</Container>
	);
};

export default SignInPage;
