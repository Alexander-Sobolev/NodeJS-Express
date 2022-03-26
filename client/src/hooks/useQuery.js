import { useLocation } from 'react-router-dom'

export function useQueryURL() {
	return new URLSearchParams(useLocation().search)
}
