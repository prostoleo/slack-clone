import { RefObject } from 'react';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

export function useScrollIntoView(
	elRef: RefObject<HTMLElement>,
	deps: Array<string | number | boolean | unknown>
) {
	useEnhancedEffect(() => {
		elRef?.current?.scrollIntoView({
			behavior: 'smooth',
		});
	}, [...deps]);
}
