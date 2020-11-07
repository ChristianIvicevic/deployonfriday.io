import { Icon, Switch } from '@blueprintjs/core';
import { useTheme } from 'contexts/theme-context';

export const ThemeSwitch = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const themeIcon = (
    <Icon icon={currentTheme === 'light' ? 'flash' : 'moon'} iconSize={20} />
  );

  return (
    <Switch
      checked={currentTheme === 'dark'}
      onChange={toggleTheme}
      alignIndicator="right"
      labelElement={themeIcon}
      large
    />
  );
};
