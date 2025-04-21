import { renderHook, act } from '@testing-library/react';
import {usePagination} from '../usePagination';

describe('usePagination', () => {
    const onPageSelect = jest.fn();

    it('should be initialized with correct values', () => {
        const { result } = renderHook(() => usePagination(1, 10, onPageSelect));
        expect(result.current.currentPage).toBe(1);
        expect(result.current.visiblePages).toEqual([1, 2, 3, 4, 5]);
        expect(result.current.buttonStates).toEqual({leftArrow: true, rightArrow: false});
    });

    it('should change pages correctly', () => {
        const { result } = renderHook(() => usePagination(1, 10, onPageSelect));
        act(() => {result.current.onPageChange(6);});
        expect(result.current.currentPage).toBe(6);
        expect(result.current.visiblePages).toEqual([4, 5, 6, 7, 8]);
        expect(onPageSelect).toHaveBeenCalledWith(6);
    });

    it('should process left arrow click correctly', () => {
        const { result } = renderHook(() => usePagination(5, 10, onPageSelect));
        act(() => {result.current.onLeftArrowClick();});
        expect(result.current.visiblePages).toEqual([2, 3, 4, 5, 6]);
    });

    it('should process right arrow click correctly', () => {
        const { result } = renderHook(() => usePagination(5, 10, onPageSelect));
        act(() => {result.current.onRightArrowClick();});
        expect(result.current.visiblePages).toEqual([4, 5, 6, 7, 8]);
    });

    it('should not allow left arrow click at start', () => {
        const { result } = renderHook(() => usePagination(1, 10, onPageSelect));
        act(() => {result.current.onLeftArrowClick();});
        expect(result.current.visiblePages).toEqual([1, 2, 3, 4, 5]);
    });

    it('should not allow right arrow click at the end', () => {
        const { result } = renderHook(() => usePagination(10, 10, onPageSelect));
        act(() => {result.current.onRightArrowClick();});
        expect(result.current.visiblePages).toEqual([6, 7, 8, 9, 10]);
    });

    it('should process pageCount less than 5', () => {
        const { result } = renderHook(() => usePagination(1, 3, onPageSelect));
        expect(result.current.visiblePages).toEqual([1, 2, 3]);
        expect(result.current.buttonStates).toEqual({leftArrow: true, rightArrow: true});
    });

    it('should update when pageCount changes', () => {
        const { result, rerender } = renderHook(
            (props) => usePagination(props.initialPage, props.pageCount, onPageSelect),
            { initialProps: { initialPage: 5, pageCount: 10 } }
        );
        rerender({ initialPage: 5, pageCount: 20 });
        expect(result.current.visiblePages).toEqual([3, 4, 5, 6, 7]);
        expect(result.current.buttonStates.rightArrow).toBe(false);
    });

    it('should process navigation to the last pages correctly', () => {
        const { result } = renderHook(() => usePagination(8, 10, onPageSelect));
        expect(result.current.visiblePages).toEqual([6, 7, 8, 9, 10]);
        expect(result.current.buttonStates).toEqual({leftArrow: false, rightArrow: true});
    });
});