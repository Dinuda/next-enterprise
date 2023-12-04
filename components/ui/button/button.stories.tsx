// Button.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Button, ButtonProps, colorVariants, sizeVariants } from 'components/ui/button/button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args}>Button</Button>;

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  size: 'default',
};

// Stories for each color variant
type VariantKeys = keyof typeof colorVariants;
const createColorVariantStory = (variantName: VariantKeys) => {
  const StoryComponent = Template.bind({});
  StoryComponent.args = {
    variant: variantName,
    size: 'default',
  };
  return StoryComponent;
};

// Stories for each size variant
type SizeKeys = keyof typeof sizeVariants;
const createSizeVariantStory = (sizeName: SizeKeys) => {
  const StoryComponent = Template.bind({});
  StoryComponent.args = {
    variant: 'default',
    size: sizeName,
  };
  return StoryComponent;
};

// Export color variant stories
export const Primary = createColorVariantStory('default');
export const Destructive = createColorVariantStory('destructive');
// ... continue for other color variants

// Export size variant stories
export const Small = createSizeVariantStory('sm');
export const Large = createSizeVariantStory('lg');
// ... continue for other size variants

// Note: Add explicit exports for each variant as shown above.
// You can use a similar approach for combining color and size variants if needed.
