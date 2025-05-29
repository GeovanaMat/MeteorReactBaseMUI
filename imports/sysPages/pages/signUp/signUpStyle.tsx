/*!

 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import { Box, BoxProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import { ElementType } from "react";
import { sysSizing } from "/imports/ui/materialui/styles";

interface ISignUpStyles {
	Container: ElementType<BoxProps>,

}

const signUpStyle = {
	Container: styled(Box)( {
		width: '100vw',
		height: '100vh',
	}),
	Content: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		color: theme.palette.common.black,
		gap: theme.spacing(6),
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,

		
	})),
	FormContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		gap: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		maxWidth: '600px'
	}))
}

export default signUpStyle;