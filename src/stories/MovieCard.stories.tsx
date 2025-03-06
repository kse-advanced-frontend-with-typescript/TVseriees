import type { Meta, StoryObj } from '@storybook/react';
import { MovieCard } from '../Components/MovieCard/MovieCard';
import image from '../../images/ItExample.jpg';

const meta: Meta<typeof MovieCard> = {
    component: MovieCard,
    title: 'MovieCard',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

export const Primary: Story = {
    args: {
        imagePath: image,
        name: 'It',
        year: 2017,
    }
};