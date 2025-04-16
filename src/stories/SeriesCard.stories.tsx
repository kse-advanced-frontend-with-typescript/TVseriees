import type { Meta, StoryObj } from '@storybook/react';
import { SeriesCard } from '../Components/SeriesCard/SeriesCard';
import {fn} from '@storybook/test';
import {Collection} from '../types';

const meta: Meta<typeof SeriesCard> = {
    component: SeriesCard,
    title: 'SeriesCard',
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SeriesCard>;

export const Usual: Story = {
    args: {
        id: 1,
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        topicOfCard: 'usual',
        onAdd: fn(),
        onDelete: fn()

    }
};
export const Favourites: Story = {
    args: {
        id: 1,
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        averageVote: 67,
        voteCount: 788,
        topicOfCard: 'favourites' as Collection,
        onDelete: fn()

    }
};
export const ToWatch: Story = {
    args: {
        id: 1,
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        averageVote: 67,
        voteCount: 788,
        topicOfCard: 'future',
        onDelete: fn()
    }
};
export const Watched: Story = {
    args: {
        id: 1,
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        averageVote: 67,
        voteCount: 788,
        topicOfCard: 'watched',
        onDelete: fn()
    }
};