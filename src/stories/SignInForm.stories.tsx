import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {SignUpForm} from '../AuthForm/SignUpForm';

const meta : Meta<typeof  SignUpForm>={
    component: SignUpForm,
    title: 'SignUpForm',

};


export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={


};
