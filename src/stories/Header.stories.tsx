import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import styles from '../main.css';
import {Header, HeaderRight} from '../Components/Header/Header';
import {MenuButton} from '../Components/MenuButton/MenuButton';
import {MiniButton} from '../Components/MiniButton/MiniButton';
import {AuthorizationButton} from '../Components/AuthorizationButton/AuthorizationButton';
const meta : Meta<typeof  Header>={
    component: Header,
    title: 'Header',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

    render: () => {
        return (
            <Header>
                <MenuButton/>
                <h1>TV Serieees</h1>
                <HeaderRight>
                    <AuthorizationButton type={'log'}/>
                    <AuthorizationButton type={'sign'}/>
                </HeaderRight>
            </Header>
        );
    }
};

export const Secondary: Story ={

    render: () => {
        return (
            <Header>
                <MenuButton/>
                <h1>TV Serieees</h1>
                <HeaderRight>
                    <MiniButton topic='search' size='medium'/>
                    <AuthorizationButton type={'log'}/>
                    <AuthorizationButton type={'sign'}/>
                </HeaderRight>
            </Header>
        );
    }
};