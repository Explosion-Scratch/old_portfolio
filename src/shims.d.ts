import type { AttributifyAttributes } from 'unocss';

declare global {
	namespace svelte.JSX {
		interface HTMLAttributes<T> extends AttributifyAttributes {}
	}
}
