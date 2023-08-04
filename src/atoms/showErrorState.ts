import { atom } from 'recoil'

export const showErrorState = atom<string>({
  key: 'ShowError',
  default: '',
})
