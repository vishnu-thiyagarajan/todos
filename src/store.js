import { writable } from 'svelte/store'
export const toDoObj = writable([])
export const rename = writable(false)
export const activeSection = writable(0)
