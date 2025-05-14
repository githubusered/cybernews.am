import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Search.css';
import { generateCombinations } from '../../../assets/utils/HelpUtils';
import fallBackNewsEn from '../../../data/fetchByInterests.en.json'
import fallBackNewsHy from '../../../data/fetchByInterests.hy.json'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Search = ({type='newses',searchQuery, setSearchQuery, setSearchResults, searchResults, className, events=[]}) => {
    
    const { t, i18n } = useTranslation("news");
    
  if(type === 'newses'){
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query !== '') {
      try {
        const response = await axios.get(`${backendUrl}api/${type}?filters[$or][0][title][$containsi]=${query}&filters[$or][1][bodyText][$containsi]=${query}&locale=${i18n.language}`);
        const allResults = response.data.data;
        const searchLower = query.toLowerCase();

        const filteredResults = allResults.filter(item => {
          const titleWords = item.title.split(/\s+/).map(word => word.toLowerCase());
          const allBodyText = item.bodyText.map(p => p.children.map(child => child.text).join(' ')).join(' ');
          const bodyWords = allBodyText.split(/\s+/).map(word => word.toLowerCase());

          const titleCombinations = [
            ...generateCombinations(titleWords, 1),
            ...generateCombinations(titleWords, 2),
            ...generateCombinations(titleWords, 3),
            ...generateCombinations(titleWords, 4),
          ];

          const bodyCombinations = [
            ...generateCombinations(bodyWords, 1),
            ...generateCombinations(bodyWords, 2),
            ...generateCombinations(bodyWords, 3),
            ...generateCombinations(bodyWords, 4),
          ];

          const allCombinations = [...titleCombinations, ...bodyCombinations];

          return allCombinations.some(combination => combination.includes(searchLower));
        });

        setSearchResults(filteredResults);
      } catch (error) {
        const fallBackNews = i18n.language === 'hy' ? fallBackNewsHy : fallBackNewsEn;
        const allResults = fallBackNews.data;
        const searchLower = query.toLowerCase();

        const filteredResults = allResults.filter(item => {
          const titleWords = item.title.split(/\s+/).map(word => word.toLowerCase());
          const allBodyText = item.bodyText.map(p => p.children.map(child => child.text).join(' ')).join(' ');
          const bodyWords = allBodyText.split(/\s+/).map(word => word.toLowerCase());

          const titleCombinations = [
            ...generateCombinations(titleWords, 1),
            ...generateCombinations(titleWords, 2),
            ...generateCombinations(titleWords, 3),
            ...generateCombinations(titleWords, 4),
          ];

          const bodyCombinations = [
            ...generateCombinations(bodyWords, 1),
            ...generateCombinations(bodyWords, 2),
            ...generateCombinations(bodyWords, 3),
            ...generateCombinations(bodyWords, 4),
          ];

          const allCombinations = [...titleCombinations, ...bodyCombinations];

          return allCombinations.some(combination => combination.includes(searchLower));
        });

        setSearchResults(filteredResults);
        console.error("Search error", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="search">
      <label htmlFor="search" className="searchLabel">
        <input
          type="search"
          name="search"
          className='input'
          placeholder={t('search')}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="searchIcon">
          <FontAwesomeIcon icon={faSearch} className="searchIconMagnifying" />
        </span>
      </label>

      {searchQuery && searchResults.length > 0 && (
        <div className="searchResults">
          <ul className="searchResultsList">
            {searchResults.map((item) => (
              <li key={item.slug}>
                <NavLink to={`/news/${item.category}/${item.slug}`} className="searchResultItem">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  }else if(type === 'events'){
  const handleSearchChange = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if(!query) {
        setSearchResults([])
        return
    }
    const filtered = events.filter(event => {
      const title = event.title?.toLowerCase() || '';
      const publisher = event.publisher?.toLowerCase() || '';
      const category = event.category?.toLowerCase() || '';
      const bodyText = event.bodyText?.map(p => p.children.map(child => child.text).join(' ')).join(' ').toLowerCase() || '';

    
    return (
      title.includes(query) ||
      publisher.includes(query) ||
      category.includes(query) ||
      bodyText.includes(query)
      );
    });

    setSearchResults(filtered);
  };

  return (
    <div className="search">
      <label htmlFor="search" className="searchLabel">
        <input
          type="search"
          name="search"
          className={`input ${className ? className : ''}`}
          placeholder={t('search')}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="searchIcon">
          <FontAwesomeIcon icon={faSearch} className="searchIconMagnifying" />
        </span>
      </label>

      
    </div>
  );
  }
  
};

export default Search;
