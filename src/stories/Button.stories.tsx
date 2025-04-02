import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../Components/Button/Button';
import {fn} from '@storybook/test';

const meta : Meta<typeof  Button>={
    component: Button,
    title: 'AddMoreButton',

};

export default meta;
type Story = StoryObj<typeof meta>
export const ShowMore: Story ={
    args: {
        purpose: 'Show more',
        onClick:  fn()
    }
};
export const Delete: Story ={
    args: {
        purpose: 'Delete',
        onClick: fn()
    }
};