import { component$, Slot } from '@builder.io/qwik';
import { Navbar } from '../../components/administrativa/navbar';


export default component$(() => {
  return <Navbar >
  <Slot />;
  </Navbar >;
});
