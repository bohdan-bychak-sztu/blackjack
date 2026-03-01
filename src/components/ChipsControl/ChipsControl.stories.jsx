import ChipsControl from './ChipsControl';

export default {
    title: 'Blackjack/ChipsControl',
    component: ChipsControl,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '3rem', background: '#1a472a', minHeight: '300px' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        balance: {
            name: 'Balance',
            description: 'Загальна сума грошей гравця',
            control: { type: 'number' },
            table: { type: { summary: 'number' } },
        },
        currentBet: {
            name: 'Current Bet',
            description: 'Сума, яку гравець уже поставив на кін',
            control: { type: 'number' },
            table: { type: { summary: 'number' } },
        },
        isBetPlaced: {
            name: 'Is Bet Placed',
            description: 'Чи підтверджена ставка? Якщо true, фішки блокуються для натискання',
            control: 'boolean',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        onBet: {
            name: 'onBet Callback',
            description: 'Функція, що викликається при кліку на фішку (додає або віднімає суму)',
            action: 'bet changed',
            table: { category: 'Events' },
        },
    },
};

const Template = (args) => <ChipsControl {...args} />;

export const Default = Template.bind({});
Default.args = {
    balance: 1000,
    currentBet: 0,
    isBetPlaced: false,
};

export const ActiveBetting = Template.bind({});
ActiveBetting.args = {
    balance: 850,
    currentBet: 150,
    isBetPlaced: false,
};

export const BetLocked = Template.bind({});
BetLocked.args = {
    balance: 850,
    currentBet: 150,
    isBetPlaced: true,
};

export const LowBalance = Template.bind({});
LowBalance.args = {
    balance: 4,
    currentBet: 0,
    isBetPlaced: false,
};