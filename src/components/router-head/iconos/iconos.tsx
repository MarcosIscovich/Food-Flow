import { component$ } from '@builder.io/qwik';
interface IconProps {
    size?: string;
  }

const defaultSize = '18';

export const IcoAdmin = component$<IconProps>(({size: _size = defaultSize}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={_size} height={_size} viewBox="0 0 24 24"><path fill="currentColor" d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8Zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4Zm9 6h1v5h-8v-5h1v-1a3 3 0 1 1 6 0v1Zm-2 0v-1a1 1 0 1 0-2 0v1h2Z"/></svg>
});


export const IcoAdicionador = component$<IconProps>(({size: _size = defaultSize}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22v-9.15q-1.275-.35-2.138-1.4T4 9V2h2v7h1V2h2v7h1V2h2v7q0 1.4-.863 2.45T9 12.85V22H7Zm10 0v-8h-3V7q0-2.075 1.463-3.538T19 2v20h-2Z"/></svg>
    });

export const IcoCajero = component$<IconProps>(({size: _size = defaultSize}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2 17h20v4H2v-4M6.25 7H9V6H6V3h8v3h-3v1h6.8c1 0 2 1 2.2 2l.5 7h-17l.55-7c0-1 1-2 2.2-2M13 9v2h5V9h-5M6 9v1h2V9H6m3 0v1h2V9H9m-3 2v1h2v-1H6m3 0v1h2v-1H9m-3 2v1h2v-1H6m3 0v1h2v-1H9M7 4v1h6V4H7Z"/></svg>
    });
export const IcoUnder = component$<IconProps>(({size: _size = defaultSize}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.34 16.06a1 1 0 0 0-1.108.3l-3.772 4.526l-5.436-.988l-3.602-8.952A3.014 3.014 0 0 0 12.614 9h-4.06a3.002 3.002 0 0 0-1.544.428L2 12.434v6.4l5 .91V30h2v-9.893l3.565.648L14 24.2V30h2v-6.2l-1.091-2.618l8.081 1.469l-4.758 5.709A1 1 0 0 0 19 30h10a1 1 0 0 0 1-1V17a1 1 0 0 0-.66-.94zM4 17.166v-3.6l3-1.8v5.945zm5 .909V11h3.614a1.014 1.014 0 0 1 .945.67l3.14 7.805zM28 28h-6.865L28 19.762zM12.5 8A3.5 3.5 0 1 1 16 4.5A3.504 3.504 0 0 1 12.5 8zm0-5A1.5 1.5 0 1 0 14 4.5A1.502 1.502 0 0 0 12.5 3z"/></svg>
    });