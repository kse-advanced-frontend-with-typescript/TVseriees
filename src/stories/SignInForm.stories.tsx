import type {Meta, StoryObj} from '@storybook/react';
import {SignUpForm} from '../Components/AuthForm/SignUpForm';
import {fn} from '@storybook/test';

const meta : Meta<typeof  SignUpForm>={
    component: SignUpForm,
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
