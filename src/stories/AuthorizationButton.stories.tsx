import type {Meta, StoryObj} from '@storybook/react';

import {AuthorizationButton} from '../Components/AuthorizationButton/AuthorizationButton';


const meta : Meta<typeof  AuthorizationButton>={
    component: AuthorizationButton,
    title: 'AuthorizationButton',

};

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story ={

};