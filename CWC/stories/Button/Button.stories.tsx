import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Add12Regular } from "@fluentui/react-icons";
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme } from '../../src/Theme/Theme';
import Button from '../../src/Controls/Button/Button';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Button',
    tags: ['Components', 'button'],
    args: {
        appearance: 'primary',
        label: 'Button',
        onClick: action('clicked'),
    },
    argTypes: {
        appearance: {
            options: ['primary', 'secondary', 'outline', 'subtle', 'transparent'],
            control: { type: 'radio' },
            description: 'The appearance of the button.',
            name: 'Appearance',
        },
        label: {
            description: 'The text of the button.',
            control: { type: 'text' }
        },
        onClick: {
            description: 'The click event handler.',
            name: 'onClick',
        }
    },
    render: (args) => (
        <FluentProvider theme={lightTheme}>
            <Button {...args} />
        </FluentProvider>
    ),
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        appearance: 'primary',
        label: 'Button',
    },
    argTypes: {
        appearance: {
            options: ['primary', 'secondary', 'outline', 'subtle', 'transparent'],
            control: { type: 'radio' },
            description: 'The appearance of the button.',
            name: 'Appearance',
        },
        label: {
            description: 'The text of the button.',
            control: { type: 'text' }
        }
    },
};

export const WithIcon: Story = {
    args: {
        appearance: 'outline',
        label: 'Icon Button',
        icon: <Add12Regular />,
    },
    argTypes: {
        appearance: {
            options: ['primary', 'secondary', 'outline', 'subtle', 'transparent'],
            control: { type: 'radio' },
            description: 'The appearance of the button.',
            name: 'Appearance',
        },
        label: {
            description: 'The text of the button.',
            control: { type: 'text' }
        },
    },
};