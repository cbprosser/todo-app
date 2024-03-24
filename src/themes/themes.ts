import { __themeBasicallyBlue } from './themeBasicallyBlue';
import { __themeGenerallyGreen } from './themeGenerallyGreen';
import { __themeIronicallyIndigo } from './themeIronicallyIndigo';
import { __themeObviouslyOrange } from './themeObviouslyOrange';
import { __themePerfectlyPink } from './themePerfectlyPink';
import { __themeReallyRed } from './themeReallyRed';
import { __themeVeryViolet } from './themeVeryViolet';
import { __themeYesItsYellow } from './themeYesItsYellow';
import { AppTheme, AppThemeKey } from './themes.types';

export const __themes = {
  __themeReallyRed,
  __themeObviouslyOrange,
  __themeYesItsYellow,
  __themeGenerallyGreen,
  __themeBasicallyBlue,
  __themeIronicallyIndigo,
  __themeVeryViolet,
  __themePerfectlyPink,
};

export const themesObject = Object.fromEntries(
  Object.entries(__themes).map(([key, value]) => [key.replace('__', ''), value])
) as Record<AppThemeKey, AppTheme>;

export const themesArray = Object.values(themesObject);

export const themeNamesArray = themesArray.map((theme) => theme.name);
