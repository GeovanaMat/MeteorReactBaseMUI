import { Box, BoxProps, ListItemProps, ListProps,styled } from "@mui/material";
import { ElementType } from "react";
interface ITarefaHomeStyles {
    Container: ElementType<BoxProps>,
    Content: ElementType<BoxProps>,
    //List: ElementType<ListProps>,
}

const TarefaHomeStyles: ITarefaHomeStyles =  {
    Container: styled(Box)({
        display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'center',
		alignItems: 'center',
        padding: '1rem 1rem',
        width: '100%',
		height: '100%',
    }),
    Content: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        // padding: '0.5rem 5rem',
        width: '100%',
        color: 'black'
    })
}

export default TarefaHomeStyles;