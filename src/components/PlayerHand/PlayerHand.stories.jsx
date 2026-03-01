import PlayerHand from './PlayerHand';

export default {
    title: 'Blackjack/PlayerHand',
    component: PlayerHand,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        name: {
            name: 'Player Name',
            description: 'Ім’я, що відображається над картами',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        cards: {
            name: 'Cards Array',
            description: 'Масив об’єктів типу { value, suit }',
            control: 'object',
            table: { type: { summary: 'array' } },
        },
        isDealer: {
            name: 'Is Dealer',
            description: 'Чи є цей гравець дилером (впливає на приховування першої карти)',
            control: 'boolean',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        reveal: {
            name: 'Reveal All',
            description: 'Чи відкрити всі карти (використовується в кінці раунду для дилера)',
            control: 'boolean',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
        }
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '4rem', background: '#2c3e50', minHeight: '400px' }}>
                <Story />
            </div>
        ),
    ],

};

const Template = (args) => <PlayerHand {...args} />;

export const PlayerNormal = Template.bind({});
PlayerNormal.args = {
    name: 'Гравець',
    cards: [
        { value: 'A', suit: 'S' },
        { value: '10', suit: 'H' },
    ],
    isDealer: false,
};

export const DealerHidden = Template.bind({});
DealerHidden.args = {
    name: 'Дилер',
    cards: [
        { value: 'K', suit: 'D' },
        { value: '7', suit: 'C' },
    ],
    isDealer: true,
    reveal: false,
};

export const PlayerBust = Template.bind({});
PlayerBust.args = {
    name: 'Невдаха',
    cards: [
        { value: '10', suit: 'S' },
        { value: 'J', suit: 'H' },
        { value: '5', suit: 'D' },
    ],
    isDealer: false,
};

