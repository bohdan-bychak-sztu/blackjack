import Card from './Card';

export default {
    title: 'Blackjack/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        value: {
            name: 'Value',
            description: 'Номінал карти (2-10 або J, Q, K, A)',
            control: { type: 'select' },
            options: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            table: { type: { summary: 'string' }, defaultValue: { summary: 'A' } },
        },
        suit: {
            name: 'Suit',
            description: 'Масть карти: H (Hearts), D (Diamonds), C (Clubs), S (Spades)',
            control: { type: 'select' },
            options: ['H', 'D', 'C', 'S'],
            table: { type: { summary: 'string' }, defaultValue: { summary: 'S' } },
        },
        hidden: {
            name: 'Is Hidden',
            description: 'Якщо true, показує "сорочку" карти',
            control: 'boolean',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        width: {
            name: 'Width',
            description: 'Ширина карти в пікселях (висота розраховується автоматично 2:3)',
            control: { type: 'range', min: 50, max: 300, step: 10 },
            table: { type: { summary: 'number' }, defaultValue: { summary: '100' } },
        },
    },
};

const Template = (args) => <Card {...args} />;

export const AceOfSpades = Template.bind({});
AceOfSpades.args = {
    value: 'A',
    suit: 'S',
    hidden: false,
    width: 150,
};

export const HiddenCard = Template.bind({});
HiddenCard.args = {
    value: 'A',
    suit: 'S',
    hidden: true,
    width: 150,
};

export const SmallCard = Template.bind({});
SmallCard.args = {
    value: '10',
    suit: 'H',
    hidden: false,
    width: 80,
};