import type {Meta, StoryObj} from '@storybook/react';

import {MenuButton, links} from '../Components/MenuButton/MenuButton';

const meta : Meta<typeof  MenuButton>={
    component: MenuButton,
    title: 'MenuButton',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args:{
        links: links
    }
};