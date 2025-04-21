import type {Meta, StoryObj} from '@storybook/react';
import {LogInForm} from '../Components/AuthForm/LogInForm';
import {fn} from '@storybook/test';

const meta : Meta<typeof  LogInForm>={
    component: LogInForm,
    title: 'LogInForm',

};


export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

    args: {
        onSubmit: fn()
    }
};
