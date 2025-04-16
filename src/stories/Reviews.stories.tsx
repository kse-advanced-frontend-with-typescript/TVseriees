import type {Meta, StoryObj} from '@storybook/react';
import {Reviews} from '../Components/Reviews/Reviews';

const meta : Meta<typeof Reviews>={
    component: Reviews,
    title: 'Reviews',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args: {
        reviews:  [
            {
                content: 'An absolutely mind-blowing series that perfectly blends nostalgia, horror, and coming-of-age drama. The young cast is phenomenal!',
                author: 'Emily Thompson'
            },
            {
                content: 'Incredible storytelling with amazing character development. Each season gets more intense and unpredictable.',
                author: 'Michael Rodriguez'
            },
            {
                content: 'A perfect mix of 80s pop culture, supernatural mystery, and heartwarming friendship. The Duffer Brothers have created a modern classic.',
                author: 'Sarah Lee'
            },
            {
                content: 'Winona Ryder and Millie Bobby Brown steal every scene. The show keeps you on the edge of your seat from start to finish.',
                author: 'David Chen'
            },
            {
                content: 'Not just another sci-fi show. It\'s a deep exploration of friendship, family, and the unknown. Absolutely brilliant!',
                author: 'Jessica Martinez'
            }
        ]
    }
};