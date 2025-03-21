import type {Meta, StoryObj} from '@storybook/react';

import {MenuExtended} from '../Components/MenuExtended/MenuExtended';

const meta : Meta<typeof  MenuExtended>={
    component: MenuExtended,
    title: 'MenuExteded',

};
const personalizedLinks = ['favourites', 'to-watch', 'watched'];

export default meta;
type Story = StoryObj<typeof meta>
export const Authorized: Story ={
    args: {
        links: [
            'top-rated',
            'on the air in the next 7 days',
            'popular',

        ],
        personalizedLinks: personalizedLinks,
        authorized: true
    }};

export const UnAuthorized: Story ={
    args: {
        links: [
            'top-rated',
            'on the air in the next 7 days',
            'popular',

        ],
        authorized: false
    }};