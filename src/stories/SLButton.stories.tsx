import type {Meta, StoryObj} from '@storybook/react';

import {SLButton} from '../SignLogInButton/SLButton';


const meta : Meta<typeof  SLButton>={
    component: SLButton,
    title: 'Example/SLButtons',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
// export const SignIn: Story ={
//     args:{
//         type: 'sign'
//     }
// };
// export const LogIn: Story ={
//     args:{
//         type: 'log'
//     }
// };

export const Primary: Story ={

};