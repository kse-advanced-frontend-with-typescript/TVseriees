import type {Meta, StoryObj} from '@storybook/react';
import {Warning} from '../Components/Warning/Warning';
import {fn} from '@storybook/test';

const meta : Meta<typeof  Warning>={
    component: Warning,
    title: 'Warning',

};


export default meta;
type Story = StoryObj<typeof meta>
export const DeleteEverything: Story ={
    args:{
        onClick: fn(),
        purpose: 'delete everything',
        onCancel: fn(),
        message: 'Are you sure?'
    }
};
export const LogOut: Story ={
    args:{
        onClick: fn(),
        purpose: 'log-out',
        onCancel: fn(),
        message: 'Are you sure?'
    }
};