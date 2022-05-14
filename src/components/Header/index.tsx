import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useRecoilState } from 'recoil'
import { getSearchApi } from 'services/movie'
import { searchMovieList } from 'states/movie'

import styles from './Header.module.scss'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
  const [, setMovieLists] = useRecoilState(searchMovieList)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const location = useLocation()
  const currentState = location.pathname

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    getSearchApi({ s: searchKeyword, page: 1 })
      .then((res) => res.data)
      .then((data) => {
        if (data.Response === 'False') {
          return
        }

        setMovieLists(data.Search)
      })
  }

  return (
    <div className={styles.headerContainer}>
      {currentState === '/favorites' ? (
        <span>Favorites</span>
      ) : (
        <>
          <input className={styles.searchInput} type='text' placeholder='Search movies' onChange={handleChange} />
          <button className={styles.searchButton} type='button' onClick={handleClick}>
            <FaSearch />
          </button>
        </>
      )}
    </div>
  )
}

export default Header