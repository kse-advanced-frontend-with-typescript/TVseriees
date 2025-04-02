import React, { useState } from 'react';
import styles from './style.css';
import { SearchBar } from './SearchBar';
import { FieldFilter } from './FieldFilter';
import { Year } from './Year';
import { Filter } from './Filter';

type SearchFieldProps = {
    genres: string[],
    languages: string[],
    countries: string[],
    sortOptions: string[],
    onFilterChange: (genre: string,
                     language: string,
                     country: string,
                     sortOption: string,
                     year: string) => void,
    onNameChange: (name: string) => void
}

export type FilterState = {
    genre: string,
    language: string,
    country: string,
    sortOption: string,
    year: string
}

export const SearchField: React.FC<SearchFieldProps> = ({genres, languages, countries, sortOptions, onFilterChange, onNameChange}) => {
    const [filter, setFilter] = useState<FilterState>({
        genre: '',
        language: '',
        country: '',
        sortOption: '',
        year: ''
    });

    const updateFilter = (key: keyof FilterState, value: string) => {
        const newFilter = { ...filter, [key]: value };
        setFilter(newFilter);

        onFilterChange(
            newFilter.genre,
            newFilter.language,
            newFilter.country,
            newFilter.sortOption,
            newFilter.year
        );
    };

    return (
        <div className={styles.search}>
            <div className={styles.filterContainer}>
                <Year
                    value={filter.year.toString()}
                    onInput={(yearValue: string) => updateFilter('year', yearValue)}
                />
                <FieldFilter
                    typeOfField='genre'
                    fields={genres}
                    value={filter.genre}
                    onInput={(genre: string) => updateFilter('genre', genre)}
                />
                <FieldFilter
                    typeOfField='language'
                    fields={languages}
                    value={filter.language}
                    onInput={(language: string) => updateFilter('language', language)}
                />
                <FieldFilter
                    typeOfField='country'
                    fields={countries}
                    value={filter.country}
                    onInput={(country: string) => updateFilter('country', country)}
                />
                <Filter
                    options={sortOptions}
                    value={filter.sortOption}
                    onSelectOption={(sortOption: string) => updateFilter('sortOption', sortOption)}
                />
            </div>
            <SearchBar onNameChange={onNameChange} />
        </div>
    );
};