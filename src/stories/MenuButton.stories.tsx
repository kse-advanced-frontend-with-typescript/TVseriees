import type {Meta, StoryObj} from '@storybook/react';

import {MenuButton} from '../Components/MenuButton/MenuButton';
import {links} from '../ExampleData';

const meta : Meta<typeof  MenuButton>={
    component: MenuButton,
    title: 'MenuButton',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args:{
        links: links
    }
};