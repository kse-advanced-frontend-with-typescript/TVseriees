import type {Meta, StoryObj} from '@storybook/react';

import {Footer} from '../Components/Footer/Footer';

const meta : Meta<typeof  Footer>={
    component: Footer,
    title: 'Footer',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={};