import type { Meta, StoryObj } from '@storybook/react';
import { SeriesCard } from '../Components/SeriesCard/SeriesCard';
import {fn} from '@storybook/test';

const meta: Meta<typeof SeriesCard> = {
    component: SeriesCard,
    title: 'SeriesCard',
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SeriesCard>;

export const Usual: Story = {
    args: {
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        topicOfCard: 'usual',
        onStarClick: fn(),
        onCircleClick: fn(),
        onHeartClick: fn()
    }
};
export const Favourites: Story = {
    args: {
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        averageVote: 67,
        voteCount: 788,
        topicOfCard: 'favourites',
        onIconClick: fn()

    }
};
export const ToWatch: Story = {
    args: {
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        averageVote: 67,
        voteCount: 788,
        topicOfCard: 'to-watch',
        onIconClick: fn()
    }
};
export const Watched: Story = {
    args: {
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        averageVote: 67,
        voteCount: 788,
        topicOfCard: 'watched',
        onIconClick: fn()
    }
};