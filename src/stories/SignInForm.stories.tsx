import type {Meta, StoryObj} from '@storybook/react';
import {RegisterForm} from '../Components/AuthForm/RegisterForm';
import {fn} from '@storybook/test';

const meta : Meta<typeof  RegisterForm>={
    component: RegisterForm,
    title: 'SignUpForm',

};


export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

    args:
        {
            onSubmit: fn()
        }
};
