import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {Header} from '../Components/Header/Header';
import {MenuButton} from '../Components/MenuButton/MenuButton';
import {MiniButton} from '../Components/MiniButton/MiniButton';
import {AuthorizationButton} from '../Components/AuthorizationButton/AuthorizationButton';
import {fn} from '@storybook/test';
import {links} from '../ExampleData';

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
            <Header part='main'>
                <Header part='left'><MenuButton authorized={false} links={links}/> </Header>
                <h1>TV Serieees</h1>
                <Header part='right'>
                    <AuthorizationButton type={'log-in'} onClick={fn}/>
                    <AuthorizationButton type={'sign'} onClick={fn}/>
                </Header>
            </Header>
        );
    }
};

export const Secondary: Story ={

    render: () => {
        return (
            <Header part='main'>
                <Header part='left'><MenuButton authorized={false} links={links}/> </Header>
                <h1>TV Serieees</h1>
                <Header part='right'>
                    <MiniButton topic='search' size='medium' onClick={fn}/>
                    <AuthorizationButton  type={'log-in'} onClick={fn}/>
                    <AuthorizationButton type={'sign'}  onClick={fn}/>
                </Header>
            </Header>
        );
    }
};

export const Third: Story ={

    render: () => {
        return (
            <Header part='main'>
                <Header part='left'><MenuButton authorized={false} links={links}/> </Header>
                <h1>TV Serieees</h1>
                <Header part='right'>
                    <MiniButton topic='search' size='medium'onClick={fn}/>
                    <h2>Username</h2>
                    <AuthorizationButton  type={'log-out'} onClick={fn}/>
                </Header>
            </Header>
        );
    }
};
export const Forth: Story ={

    render: () => {
        return (
            <Header part='main'>
                <Header part='left'><MenuButton authorized={false} links={links}/> </Header>
                <h1>TV Serieees</h1>
                <Header part='right'>
                    <h2>Username</h2>
                    <AuthorizationButton type={'log-out'} onClick={fn}/>
                </Header>
            </Header>
        );
    }
};