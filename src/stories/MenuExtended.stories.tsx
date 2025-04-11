import type {Meta, StoryObj} from '@storybook/react';

import {MenuExtended} from '../Components/MenuExtended/MenuExtended';
import {links} from '../BusinessData';

const meta : Meta<typeof  MenuExtended>={
    component: MenuExtended,
    title: 'MenuExteded',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Authorized: Story ={
    args: {
        links: links,
        authorized: true
    }};

