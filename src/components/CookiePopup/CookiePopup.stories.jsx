import CookiePopup from './CookiePopup';

export default {
    title: 'Blackjack/CookiePopup',
    component: CookiePopup,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        forceVisible: {
            name: 'Force Visible',
            description: 'Якщо true, ігнорує збережені кукі і завжди показує банер (режим debug)',
            control: 'boolean',
            table: {
                category: 'Development',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        location: {
            name: 'Position',
            description: 'Де саме на екрані з’явиться банер',
            control: { type: 'select' },
            options: ['top', 'bottom', 'none'],
            table: {
                category: 'Layout',
                type: { summary: 'string' },
                defaultValue: { summary: 'bottom' },
            },
        }
    },
};

const Template = (args) => (
    <div style={{ height: '100vh', background: '#1a472a' }}>
        <div style={{ padding: '20px', color: 'white' }}>
            <h2>Задній план гри</h2>
            <p>Банер має з'явитися знизу...</p>
        </div>
        <CookiePopup {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    forceVisible: true,
};

export const Custom = Template.bind({});
Custom.args = {
    forceVisible: true
};