import type {Meta, StoryObj} from '@storybook/react';

import {ParentComponent} from "../Components/PageNavigator/PageNavigator";
import {fn} from "@storybook/test";

const meta : Meta<typeof  ParentComponent>={
    component: ParentComponent,
    title: 'PageNavigator',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story = {
    args: {
        page: 1,
        pageCount: 10
    }
};