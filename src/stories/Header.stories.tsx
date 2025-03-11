import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {Header, HeaderRight} from '../Components/Header/Header';
import {MenuButton, links} from '../Components/MenuButton/MenuButton';
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
                <MenuButton links={links}/>
                <h1>TV Serieees</h1>
                <HeaderRight>
                    <AuthorizationButton type={'log-in'}/>
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
                <MenuButton links={links}/>
                <h1>TV Serieees</h1>
                <HeaderRight>
                    <MiniButton topic='search' size='medium' onClick={()=>alert('clicked')}/>
                    <AuthorizationButton type={'log-in'}/>
                    <AuthorizationButton type={'sign'}/>
                </HeaderRight>
            </Header>
        );
    }
};

export const Third: Story ={

    render: () => {
        return (
            <Header>
                <MenuButton links={links}/>
                <h1>TV Serieees</h1>
                <HeaderRight>
                    <MiniButton topic='search' size='medium' onClick={()=>alert('clicked')}/>
                    <h2>Username</h2>
                    <AuthorizationButton type={'log-out'}/>
                </HeaderRight>
            </Header>
        );
    }
};
export const Forth: Story ={

    render: () => {
        return (
            <Header>
                <MenuButton links={links}/>
                <h1>TV Serieees</h1>
                <HeaderRight>
                    <h2>Username</h2>
                    <AuthorizationButton type={'log-out'}/>
                </HeaderRight>
            </Header>
        );
    }
};