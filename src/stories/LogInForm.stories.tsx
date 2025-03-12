import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {LogInForm} from '../Components/AuthForm/LogInForm';

const meta : Meta<typeof  LogInForm>={
    component: LogInForm,
    title: 'LogInForm',

};


export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

   
};
