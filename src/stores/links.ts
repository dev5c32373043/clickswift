import { atom, action } from 'nanostores';

export const linkStore = atom([]);

export const addLink = action(linkStore, 'addLink', (store, newLink) => {
  store.set([newLink, ...store.get()]);
});

export const removeLink = action(linkStore, 'removeLink', (store, linkId: number) => {
  store.set(store.get().filter(l => l.id !== linkId));
});
