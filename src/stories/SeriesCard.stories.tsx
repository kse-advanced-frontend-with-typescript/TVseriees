import type { Meta, StoryObj } from '@storybook/react';
import { SeriesCard } from '../Components/SeriesCard/SeriesCard';
import image from '../Components/Icon/icons/ItExample.jpg';

const meta: Meta<typeof SeriesCard> = {
    component: SeriesCard,
    title: 'SeriesCard',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SeriesCard>;

export const Primary: Story = {
    args: {
        imagePath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRgkYZsfXNl9h-uMs_fYGyLC0A3d4IaKGOoG9-i-RE9COo7Lhqrcke7eFKW06gG6SC9veNHtw',
        name: 'It',
        year: 2017,
    }
};