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
}

export const SearchField: React.FC<SearchFieldProps> = ({genres, languages, countries, sortOptions}) => {
    const [genreFilter, setGenreFilter] = useState<string>('');
    const [languageFilter, setLanguageFilter] = useState<string>('');
    const [countryFilter, setCountryFilter] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('');
    const [year, setYear] = useState<string>('');

    return (
        <>
            <div className={styles.filterContainer}> <Year value={year} onInput={setYear}/>
                <FieldFilter
                    typeOfField='genre'
                    fields={genres}
                    value={genreFilter}
                    onInput={setGenreFilter}
                />
                <FieldFilter
                    typeOfField='language'
                    fields={languages}
                    value={languageFilter}
                    onInput={setLanguageFilter}
                />
                <FieldFilter
                    typeOfField='country'
                    fields={countries}
                    value={countryFilter}
                    onInput={setCountryFilter}
                />
                <Filter
                    options={sortOptions}
                    value={sortOption}
                    onSelectOption={setSortOption}
                />
            </div>
            <SearchBar />
        </>
    );
};
