// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, {useContext} from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import Styles from './signUpStyle';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { signUpSchema } from './signUpSch';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { Typography } from '@mui/material';
import { SysButton } from '/imports/ui/components/SimpleFormFields/SysButton/SysButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	
	const sysLayoutContext = useContext(AppLayoutContext);

	const navigate = useNavigate();

	const handleClose = () => {
		navigate(-1);
	}
	const handleSubmit = (doc: { username: string, email: string; password: string }) => {
		const {username, email, password } = doc;
		console.log(doc);
		userprofileApi.insertNewUser({ email, username, password }, (err, r) => {
			if (err) {
				
				console.log('Login err', err);
				sysLayoutContext.showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
					});
					return
			} 
			sysLayoutContext.showNotification({
				type: 'success',
				title: 'Cadastrado com sucesso!',
			});
			navigate('/');
		});
	};

	return (
		<Styles.Container>
			<Styles.Content>
				<Styles.FormContainer>
				<SysForm 
				schema={signUpSchema}
				onSubmit={handleSubmit}
				>
					<Typography variant='h2' >Cadastro</Typography>
					<Box sx={{margin: '1rem'}}>
					<SysTextField name='username'  fullWidth placeholder='Digite seu nome de usuário'/>
					<SysTextField name='email' fullWidth placeholder='Digite seu e-mail'/>
					<SysTextField name='password' fullWidth placeholder='Digite sua senha' type='password'/>
					</Box>

					<Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
					<Button onClick={handleClose} variant='outlined'> 
						<SysIcon name='close'/>
						Cancelar
					</Button>
					<SysFormButton type='submit'>
						Cadastrar
					</SysFormButton>
					</Box>
					
				</SysForm>
				</Styles.FormContainer>
			</Styles.Content>
			
		</Styles.Container>



			
	);
};

{/* <Box sx={signUpStyle.labelRegisterSystem}>
				<img src="/images/wireframe/logo.png" style={signUpStyle.imageLogo} />
				{'Cadastrar no sistema'}
			</Box>
			<SimpleForm
				schema={{
					email: {
						type: String,
						label: 'Email',
						optional: false
					},
					password: {
						type: String,
						label: 'Senha',
						optional: false
					}
				}}
				onSubmit={handleSubmit}>
				<TextField id="Email" label="Email" fullWidth name="email" type="email" placeholder="Digite um email" />
				<TextField id="Senha" label="Senha" fullWidth name="password" placeholder="Digite uma senha" type="password" />
				<Box sx={signUpStyle.containerButtonOptions}>
					<Button color={'primary'} variant={'outlined'} id="submit">
						Cadastrar
					</Button>
				</Box>
			</SimpleForm>
			<Box sx={signUpStyle.containerRouterSignIn}>
				Já tem uma conta? Faça login clicando{' '}
				<Link to="/signin" color={'secondary'}>
					aqui
				</Link>
			</Box> */}