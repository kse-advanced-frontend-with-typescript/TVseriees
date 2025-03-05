import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import styles from '../main.css';
import {Title} from '../Components/Title/Title';
import {MenuButton} from '../MenuButton/MenuButton';
import {MiniButton} from '../MiniButton/MiniButton';
import {SLButton} from '../SignLogInButton/SLButton';
import search from '../../images/search.png';
const meta : Meta<typeof  Title>={
    component: Title,
    title: 'Example/Title',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={

    render: () => {
        return (
            <Title>
                <MenuButton/>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.headerButtons}>
                    <MiniButton imagePath={search}/>
                    <SLButton type={'log'}/>
                    <SLButton type={'sign'}/>
                </div>

            </Title>
        );
    }
};