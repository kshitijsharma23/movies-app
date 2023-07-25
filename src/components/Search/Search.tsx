import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import debounce from 'lodash.debounce';

import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';

import { selectSearch } from '@reducers/commonSlice';
import {
  resetSelectedMovieDetails,
  selectMovies,
  setSelectedMovieId,
} from '@reducers/moviesSlice';

import styles from './Search.module.scss';

const SearchIconButton = styled(IconButton)(() => ({
  marginLeft: 8,
}));

const SearchInput = styled(InputBase)(() => ({
  flex: 1,
  paddingLeft: 12,
  paddingRight: 12,
}));

const Search: FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedMovieId } = useAppSelector(selectMovies);
  const { searchEnabled, searchQueryParam } = useAppSelector(selectSearch);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const clearMovieDetails = useCallback(() => {
    if (selectedMovieId) {
      dispatch(setSelectedMovieId(null));
      dispatch(resetSelectedMovieDetails());
    }
  }, [dispatch, selectedMovieId]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const input = event.target.value;
      clearMovieDetails();
      if (searchQueryParam) {
        setSearchParams({
          [searchQueryParam]: input,
        });
      }
    },
    [clearMovieDetails, searchQueryParam, setSearchParams],
  );

  const debouncedOnChange = debounce(handleChange, 300);

  const toggleSearch = () => {
    clearMovieDetails();
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  if (!searchEnabled) {
    return null;
  }

  const defaultValue = searchQueryParam
    ? searchParams.get(searchQueryParam) ?? ''
    : '';

  return (
    <div
      className={cx(styles['search-wrapper'], {
        [styles['expanded']]: showSearch,
      })}
    >
      {showSearch ? (
        <>
          <SearchIcon />
          <SearchInput
            onChange={debouncedOnChange}
            placeholder="Title, Movies, Keyword"
            inputRef={inputRef}
            defaultValue={defaultValue}
          />
          <IconButton onClick={toggleSearch}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <SearchIconButton onClick={toggleSearch}>
          <SearchIcon />
        </SearchIconButton>
      )}
    </div>
  );
};

export default Search;
