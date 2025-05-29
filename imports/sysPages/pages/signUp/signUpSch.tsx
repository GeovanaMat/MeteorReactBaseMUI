import { validarEmail } from '../../../libs/validaEmail';
import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

export const signUpSchema: ISchema<ISignUp> = {
    username: {
        type: 'String',
        label: 'Nome de usuário',
        validationFunction: (value: string) => {
            if(value.length < 3) return undefined;
        }
    },
    email: {
        type: 'String',
        label: 'Email',
        optional: false,
        validationFunction: (value: string) => {
            if (!value) return undefined;
            const email = validarEmail(value);
            if (!email) return 'Email inválido';
            return undefined;
        }
    },
    password: {
        type: 'String',
        label: 'Senha',
        optional: false,
    }
};

export interface ISignUp extends IDoc {
    username: string,
    email: string;
    password: string;
}


