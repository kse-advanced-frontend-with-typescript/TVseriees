import type {Meta, StoryObj} from '@storybook/react';

import {AddMoreButton} from '../AddMoreButton/AddMoreButton';

const meta : Meta<typeof  AddMoreButton>={
    component: AddMoreButton,
    title: 'AddMoreButton',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args: {
        onClick:  ()=>{alert('show more !');}
    }
};