import { Icon, Switch } from '@blueprintjs/core';
import { useTheme } from 'contexts/theme-context';
import styled from 'styled-components';

export const ThemeSwitch = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const themeIcon = (
    <Icon icon={currentTheme === 'light' ? 'flash' : 'moon'} iconSize={20} />
  );

  return (
    <StyledThemeSwitch
      checked={currentTheme === 'dark'}
      onChange={toggleTheme}
      alignIndicator="right"
      labelElement={themeIcon}
      large
    />
  );
};

const StyledThemeSwitch = styled(Switch)`
  // Remove the default Blueprint margin on controls.
  line-height: normal;
  margin-bottom: 0;
`;
