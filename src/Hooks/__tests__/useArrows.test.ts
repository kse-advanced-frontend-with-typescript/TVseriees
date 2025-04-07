import { renderHook, act } from '@testing-library/react';
import { useArrows } from '../useArrows';
/**
 * @jest-environment jsdom
 */
describe('useArrows', () => {
    const mockItems = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
    const itemsPerInstance = 2;

    it('should be initialized with correct values', () => {
        const { result } = renderHook(() => useArrows(mockItems, itemsPerInstance));

        expect(result.current.visibleItems).toEqual(['item1', 'item2']);
        expect(result.current.currentIndex).toBe(0);
        expect(result.current.disableLeft).toBe(true);
        expect(result.current.disableRight).toBe(false);
    });

    it('should handle next button click correctly', () => {
        const { result } = renderHook(() => useArrows(mockItems, itemsPerInstance));

        act(() => {
            result.current.handleNext();
        });

        expect(result.current.visibleItems).toEqual(['item3', 'item4']);
        expect(result.current.currentIndex).toBe(2);
        expect(result.current.disableLeft).toBe(false);
        expect(result.current.disableRight).toBe(false);
    });

    it('should not increment index beyond array bounds', () => {
        const { result } = renderHook(() => useArrows(mockItems, itemsPerInstance));

        act(() => {
            result.current.handleNext();
        });

        act(() => {
            result.current.handleNext();
        });

        expect(result.current.visibleItems).toEqual(['item5', 'item6']);
        expect(result.current.currentIndex).toBe(4);
        expect(result.current.disableLeft).toBe(false);
        expect(result.current.disableRight).toBe(true);

        act(() => {
            result.current.handleNext();
        });

        expect(result.current.currentIndex).toBe(4);
        expect(result.current.disableRight).toBe(true);
    });

    it('should handle previous button click correctly', () => {
        const { result } = renderHook(() => useArrows(mockItems, itemsPerInstance));

        act(() => {
            result.current.handleNext();
        });

        act(() => {
            result.current.handlePrevious();
        });

        expect(result.current.visibleItems).toEqual(['item1', 'item2']);
        expect(result.current.currentIndex).toBe(0);
        expect(result.current.disableLeft).toBe(true);
        expect(result.current.disableRight).toBe(false);
    });

    it('should not decrement index below zero', () => {
        const { result } = renderHook(() => useArrows(mockItems, itemsPerInstance));

        act(() => {
            result.current.handlePrevious();
        });

        expect(result.current.currentIndex).toBe(0);
        expect(result.current.disableLeft).toBe(true);
    });

    it('should handle empty items array', () => {
        const { result } = renderHook(() => useArrows([], itemsPerInstance));

        expect(result.current.visibleItems).toEqual([]);
        expect(result.current.currentIndex).toBe(0);
        expect(result.current.disableLeft).toBe(true);
        expect(result.current.disableRight).toBe(true);
    });

    it('should handle items array smaller than itemsPerInstance', () => {
        const smallItems = ['item1', 'item2'];
        const { result } = renderHook(() => useArrows(smallItems, 3));

        expect(result.current.visibleItems).toEqual(['item1', 'item2']);
        expect(result.current.disableLeft).toBe(true);
        expect(result.current.disableRight).toBe(true);
    });
});