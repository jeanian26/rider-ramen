import config from '../config';

const themes = {
  food: {
    primaryLightColor: '#bc00218c',
    primaryColor: '#bc0021', //00b970//bc0021
    primaryColorDark: '#00945a',
    primaryColorLight: '#00e78c',
    onPrimaryColor: '#ffffff', //
    customonOnPrimaryColor: '#bc0021',

    accentColor: '#0069b9',
    onAccentColor: '#fff',

    secondaryColor: '#b90039',
    onSecondaryColor: '#fff',

    tertiaryColor: '#ffa400',
    onTertiaryColor: '#fff',

    statusBarColor: '#bc0021', //#fff

    primaryGradientColor: '#bc0021',
    secondaryGradientColor: '#bc0021',

    overlayColor: '#b90039',

    primaryText: '#010203', //#010203
    secondaryText: '#5d5d5d',
    disabledText: 'rgba(0, 0, 0, 0.38)',

    background: '#ffffff',
    onBackground: '#212121',
    surface: '#fff',
    onSurface: '#757575',
    error: '#cd040b',
    onError: '#fff',
    black: '#010203',
    white: '#fff',
  },
};

const theme = themes[config.theme];

export default theme;
