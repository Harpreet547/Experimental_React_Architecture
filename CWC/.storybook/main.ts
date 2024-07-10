import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    framework: '@storybook/react-vite',
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    typescript: {
        reactDocgenTypescriptOptions: {
            tsconfigPath: './tsconfig.stories.json',
        }
    },
    addons: [
        '@storybook/addon-controls',
        '@storybook/addon-a11y',
        '@storybook/addon-storysource',
        '@storybook/addon-measure',
        '@storybook/addon-actions',
        '@storybook/addon-docs'
    ],
};

export default config;