import { writable } from 'svelte/store'
export const toDoObj = writable([])
export const taskObj = writable([])
export const activeSection = writable('Lists')
