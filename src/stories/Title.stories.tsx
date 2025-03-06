import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import styles from '../main.css';
import {Title} from '../Components/Title/Title';
import {MenuButton} from '../Components/MenuButton/MenuButton';
import {MiniButton} from '../Components/MiniButton/MiniButton';
import {SLButton} from '../Components/SignLogInButton/SLButton';
import search from '../../images/search.png';
const meta : Meta<typeof  Title>={
    component: Title,
    title: 'Title',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

    render: () => {
        return (
            <Title>
                <MenuButton/>
                <h1>Mooovieeess</h1>
                <div className={styles.headerButtons}>
                    <MiniButton topic='search' size='medium'/>
                    <SLButton type={'log'}/>
                    <SLButton type={'sign'}/>
                </div>

            </Title>
        );
    }
};