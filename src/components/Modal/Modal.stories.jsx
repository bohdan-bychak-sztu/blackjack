import React from 'react';
import Modal from './Modal';
import ResultPage from "../../pages/ResultPage.jsx";

export default {
    title: 'Blackjack/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen', // Модал краще тестувати на весь екран
    },
    argTypes: {
        isOpen: {
            name: 'Is Open',
            description: 'Чи відображається модальне вікно',
            control: 'boolean',
            table: { category: 'Status', defaultValue: { summary: 'false' } },
        },
        title: {
            name: 'Title',
            description: 'Заголовок у хедері модала',
            control: 'text',
            table: { category: 'Content' },
        },
        onClose: {
            name: 'onClose Callback',
            description: 'Викликається при натисканні на хрестик або фон',
            action: 'closed',
            table: { category: 'Events' },
        },
        children: {
            name: 'Content',
            description: 'React-елементи всередині модала',
            control: 'text',
            table: { category: 'Content' },
        }
    },
};

const Template = (args) => (
    <div style={{ height: '100vh', padding: '20px', background: '#1a472a' }}>
        <h1 style={{ color: 'white' }}>Фон ігрового столу</h1>
        <p style={{ color: 'white' }}>Натисніть "isOpen" у панелі Controls, щоб побачити модал.</p>
        <Modal {...args} />
    </div>
);

export const GameRules = Template.bind({});
GameRules.args = {
    isOpen: true,
    title: 'Правила Блекджека',
    children: (
        <div>
            <p>1. Мета гри — набрати 21 очко або близько до того.</p>
            <p>2. Перебір (більше 21) означає миттєвий програш.</p>
            <button style={{ marginTop: '10px' }}>Зрозуміло!</button>
        </div>
    ),
};

export const GameOver = Template.bind({});
GameOver.args = {
    isOpen: true,
    title: 'Раунд завершено',
    children: <ResultPage result={"Ви виграли!"} onRestart={() => alert('Гра перезапущена')} />
};