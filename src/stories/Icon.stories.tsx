import type {Meta, StoryObj} from '@storybook/react';

import {Icon} from '../Components/Icon/Icon';

const meta : Meta<typeof  Icon>={
    component: Icon,
    title: 'Icon',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

};

